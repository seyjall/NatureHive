import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // assuming react-router
import Paymentservice from "../appwrite/payment_order.js";
import authService from "../appwrite/auth.js";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userData = await authService.getCurrentUser();
        console.log("user" , userData)
          setUser(userData.data);
        const paymentData = await Paymentservice.getPayments();
        console.log("paymentdata"  , paymentData); 
      
        setPayments(paymentData.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-black">{user.name}</h2>
          <p className="text-black">{user.email}</p>
          <p className="text-black">Password: ••••••••</p>

          <div className="mt-4 space-x-4">
           <Link
  to="/update-account"
  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Update Account Details
</Link>
           <Link
  to="/change-password"
  className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
>
  Change Password
</Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
  <h3 className="text-xl font-semibold mb-4 text-black">Payment History</h3>

  {Array.isArray(payments) && payments.length > 0 ? (
    <ul className="space-y-4">
      {payments.map((payment) => (
        <li
          key={payment._id}
          className="p-4 border rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-medium">
              Amount: ${(payment.amount / 100).toFixed(2)}
            </p>
            <p className="text-gray-500">
              Date: {new Date(payment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500">
              Payment Intent ID: {payment.paymentIntentId}
            </p>
          </div>

          <a
            href={payment.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Receipt
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600">No payments found.</p>
  )}
</div>


    
    </div>
  );
}
