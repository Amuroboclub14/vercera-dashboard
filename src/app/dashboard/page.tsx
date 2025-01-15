"use client";

import { useState, useEffect } from "react";
import PaymentStatus from "@/components/PaymentStatus";
import EventList from "@/components/EventList";
import Image from "next/image";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user ID from your Pocketbase authentication
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
    <div className="flex flex-col space-y-8">
      <div className="relative w-full h-64 sm:h-80 lg:h-96">
        <Image
          src="/vercera-logo-wide.png" // Update this path to your image
          alt="Vercera-Banner"
          layout="fill"
          objectFit="cover"
          priority // Ensures the image is loaded quickly
        />
      </div>
      <PaymentStatus userId={userId} />
      <EventList />
    </div>
  );
}
