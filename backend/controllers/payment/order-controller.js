const Order = require("../../models/Order");
const Stripe = require("stripe");
const StudentCourses = require("../../models/StudentEnrollCourse");
const Course = require("../../models/Course");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus = "pending",
      paymentMethod = "stripe",
      paymentStatus = "unpaid",
      orderDate = new Date(),
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    // 1️⃣ Create Order in MongoDB
    const newOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newOrder.save();

    // 2️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseTitle,
              images: [courseImage],
              metadata: {
                courseId,
                instructorId,
              },
            },
            unit_amount: Math.round(coursePricing * 100), // Stripe takes cents
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel?orderId=${newOrder._id}`,
    });

    // 3️⃣ Send response back to frontend
    res.status(201).json({
      success: true,
      message: "Order created, redirect to Stripe Checkout",
      data: {
        orderId: newOrder._id,
        sessionId: session.id,
        sessionUrl: session.url, // frontend can directly redirect
      },
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating order",
    });
  }
};

const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { sessionId, orderId } = req.body;

    // 1️⃣ Validate order exists in DB
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 2️⃣ Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed or session invalid",
      });
    }

    const paymentIntent = session.payment_intent;

    // 3️⃣ Update Order in DB
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentIntent.id;
    order.stripeId = session.id;

    await order.save();

    // 4️⃣ Update StudentEnrollCourses
    const studentCourses = await StudentCourses.findOne({ userId: order.userId });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });
      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });
      await newStudentCourses.save();
    }

    // 5️⃣ Update Course’s student list
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "✅ Order confirmed & payment verified",
      data: order,
    });
  } catch (err) {
    console.error("❌ Payment capture error:", err);
    res.status(500).json({
      success: false,
      message: "Some error occurred while capturing payment",
    });
  }
};


module.exports = { createOrder, capturePaymentAndFinalizeOrder };
