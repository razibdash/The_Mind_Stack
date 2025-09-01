// src/pages/PaymentCancel.jsx
import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Canceled ❌
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like you canceled the payment process. Don’t worry — you can
          try again anytime.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/courses"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back to Courses
          </Link>

          <Link
            to="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
