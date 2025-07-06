import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth.js";

export default function UpdateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const user = await authService.getCurrentUser();
        console.log("user " , user)
      setFormData({
        name: user.data.name,
        email: user.data.email,
      });

    
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.updateAccount(formData);
    alert("Account details updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-black">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 w-full text-black"
        />
      </div>
      <div>
        <label className="text-black">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 w-full text-black"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500">
        Update
      </button>
    </form>
  );
}
