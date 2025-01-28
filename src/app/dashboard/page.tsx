"use client";

import { useState, useEffect } from "react";
import PaymentStatus from "@/components/PaymentStatus";
import EventList from "@/components/EventList";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const user = pb.authStore.model;
      setUserId(user ? user.id : null);
      setIsLoading(false);
    };
    fetchUserId();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      {/* Banner Image */}
      <div className="relative w-full h-64 object-top sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/vercera-website-header.png" // Update this path to your image
          // src="/vercera-logo-wide.png" // Update this path to your image
          alt="Vercera-Banner"
          layout="fill"
          objectFit="contain" // Ensures the whole image is visible
          priority // Ensures the image is loaded quickly
          className="w-full h-full"
        />
      </div>

      {/* Register Box for Unauthenticated Users */}
      {!isLoading && !userId && (
        <>
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Register for Vercera 4.0</span>
              </CardTitle>
              <CardDescription>
                Join us for an exciting experience! Register now to secure your
                spot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Complete your registration today!
                </p>
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-between">
                  <Button className="w-full">
                    <Link href={"https://forms.gle/1TspMJNuYJGYY5467"}>
                      Register for Vercera 4.0
                    </Link>
                  </Button>
                  <Button className="w-full">
                    <Link href={"https://forms.gle/PNJ8Mh96wieAt33m8"}>
                      Register for Gaming Events
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Payment Status and Event List */}
      {/* <PaymentStatus userId={userId || "guest"} /> */}
      <PaymentStatus />
      <EventList />
    </div>
  );
}
