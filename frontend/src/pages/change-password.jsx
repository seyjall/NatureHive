import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await authService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      alert("Password changed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error changing password:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1  text-black">Old Password</label>
          <input
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded  text-black"
            required
          />
        </div>
        <div>
          <label className="block mb-1  text-black">New Password</label>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded  text-black"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-black">Confirm New Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded  text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
