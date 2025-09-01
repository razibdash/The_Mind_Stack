import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { captureAndFinalizePaymentService } from "../../services";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const finalizePayment = async () => {
      const sessionId = searchParams.get("session_id"); // Stripe sends this back
      const orderId = searchParams.get("orderId"); // Stripe sends this back
      if (!sessionId && !orderId) {
        setStatus("error");
        setMessage("No session ID or order ID found in URL.");
        return;
      }

      try {
        // 👇 Call your backend to capture + finalize
        const response = await captureAndFinalizePaymentService(
          sessionId,
          orderId
        );

        if (response.success) {
          setStatus("success");
          setMessage("✅ Payment successful! Your course is now unlocked.");
          // Optionally redirect after a delay
          setTimeout(() => {
            navigate("/courses");
          }, 3000);
        } else {
          setStatus("error");
          setMessage("⚠️ Could not finalize payment. Please contact support.");
        }
      } catch (error) {
        console.error("Payment finalization failed:", error);
        setStatus("error");
        setMessage("⚠️ Payment could not be verified.");
      }
    };

    finalizePayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-md">
        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700">Finalizing your payment...</p>
          </>
        )}
        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Success 🎉
            </h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed ❌
            </h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
