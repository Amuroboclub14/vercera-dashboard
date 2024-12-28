"use client";

import { useState, useEffect } from "react";
import PaymentStatus from "@/components/PaymentStatus";
import EventList from "@/components/EventList";

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
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Vercera 4.0. Manage your events and registrations.
        </p>
      </div>
      <PaymentStatus userId={userId} />
      <EventList />
    </div>
  );
}
