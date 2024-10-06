"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState(session?.user);

  const handleUpdate = async () => {
    const response = await fetch("/api/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });

    if (response.ok) alert("Profile updated successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Your Profile</h1>
      <p>Email: {profileData?.email}</p>
      <p>Name: {profileData?.name}</p>
      <button
        onClick={handleUpdate}
        className="mt-4 p-2 bg-black text-white rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfilePage;
