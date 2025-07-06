import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth";

export default function UpdateAvatar() {
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const user = await authService.getCurrentUser();
      if (user.avatar) {
        setPreviewUrl(user.avatar);
      }
    }
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    await authService.updateAvatar(formData);
    alert("Avatar updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Current Avatar</label>
        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Current Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border px-4 py-2 w-full"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Update Avatar
      </button>
    </form>
  );
}
