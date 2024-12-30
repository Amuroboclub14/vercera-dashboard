"use client";

import { useState, useEffect } from "react";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user ID from your Pocketbase authentication
    // This is just a placeholder, replace with your actual logic
    const fetchUserId = async () => {
      // const user = await pb.authStore.model
      // setUserId(user.id)
      setUserId("placeholder-user-id");
    };
    fetchUserId();
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <UserProfile userId={userId} />
    </>
  );
}
