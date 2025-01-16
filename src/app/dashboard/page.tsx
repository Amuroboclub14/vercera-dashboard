"use client";

import { useState, useEffect } from "react";
import PaymentStatus from "@/components/PaymentStatus";
import EventList from "@/components/EventList";
import Image from "next/image";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";


export default function DashboardPage() {
  const {userInfo} = useContext(UserContext);
  console.log(userInfo?.id);

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
      <PaymentStatus userId={userInfo?.id} />
      <EventList />
    </div>
  );
}
