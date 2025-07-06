import React from "react";
import { Link } from "react-router-dom";

function Failure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Failed or Cancelled</h1>
      <p className="text-lg mb-6">
        Your payment did not complete. You can try again.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Failure;
