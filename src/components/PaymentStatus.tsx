"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, AlertCircle, Clock } from "lucide-react";
import useFetchPaymentStatus from "@/utils/useFetchPaymentStatus";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentStatus() {
  const { paymentDetails, loading, error } = useFetchPaymentStatus();
  const router = useRouter();

  const handlePayment = async () => {
    // Redirect to payment page
    router.push("/payment");
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!paymentDetails) {
    return;
  }

  const { paymentStatus, amount, verceraId, qrCode, paymentScreenshot } =
    paymentDetails;

  const paymentUnderReview = !!paymentScreenshot && !paymentStatus;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {/* {paymentStatus ? ( */}
          <>
            {/* <Check className="h-5 w-5 text-green-500" />
              <span>Registration Complete</span> */}
          </>
          {/* ) : paymentUnderReview ? ( */}
          <>
            {/* <Clock className="h-5 w-5 text-orange-500" />
              <span>Payment Under Review</span> */}
          </>
          {/* ) : ( */}
          <>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>
              Complete your registration to participate in Vercera 4.0
            </span>
            {/* <span>Registration Pending</span> */}
          </>
          {/* )} */}
        </CardTitle>
        {/* <CardDescription>
          {paymentStatus
            ? "You're all set for Vercera 4.0"
            : paymentUnderReview
            ? "Your payment screenshot has been received. It's currently under review."
            : "Complete your registration to participate in Vercera 4.0"}
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        {/* {!paymentStatus ? ( */}
        <div className="flex flex-col space-y-4">
          {!paymentUnderReview && (
            <>
              <div className="flex flex-row space-x-4 justify-between">
                <Button className="w-full">
                  {" "}
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
              {/* <p className="text-sm text-muted-foreground">
                  Registration fee: ₹{amount}
                </p> */}
            </>
          )}
        </div>
        {/* ) : ( */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Vercera ID</span>
            <code className="relative rounded bg-muted px-[0.9rem] py-[0.2rem] font-mono text-sm">
              {verceraId}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">QR Code</span>
            {qrCode ? (
              <Image
                src={qrCode}
                alt="QR Code"
                className="h-24 w-24 border border-gray-300"
                width={1080}
                height={1080}
              />
            ) : (
              <span className="text-sm text-red-500">Not available</span>
            )}
          </div>
        </div>
        {/* )} */}
      </CardContent>
    </Card>
  );
}
