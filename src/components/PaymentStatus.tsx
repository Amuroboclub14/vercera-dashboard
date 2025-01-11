// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Check, AlertCircle } from "lucide-react";

// type PaymentStatusProps = {
//   userId: string;
// };

// export default function PaymentStatus({ userId }: PaymentStatusProps) {
//   const [paymentStatus, setPaymentStatus] = useState<
//     "unpaid" | "paid" | "loading"
//   >("loading");
//   const [amount, setAmount] = useState(0);
//   const [verceraId, setVerceraId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchPaymentStatus();
//   }, [userId]);

//   const fetchPaymentStatus = async () => {
//     try {
//       // Replace this with your Pocketbase query
//       // const record = await pb.collection('users').getOne(userId)
//       // setPaymentStatus(record.paymentStatus)
//       // setAmount(record.isAMURoboclubMember ? 100 : 200)
//       // setVerceraId(record.verceraId)

//       // Placeholder data
//       setPaymentStatus("unpaid");
//       setAmount(200);
//       setVerceraId(null);
//     } catch (error) {
//       console.error("Error fetching payment status:", error);
//       setPaymentStatus("unpaid");
//     }
//   };

//   const handlePayment = async () => {
//     // Implement payment gateway integration here
//     console.log("Processing payment...");
//   };

//   if (paymentStatus === "loading") {
//     return <div>Loading payment status...</div>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-2">
//           {paymentStatus === "paid" ? (
//             <>
//               <Check className="h-5 w-5 text-green-500" />
//               <span>Registration Complete</span>
//             </>
//           ) : (
//             <>
//               <AlertCircle className="h-5 w-5 text-yellow-500" />
//               <span>Registration Pending</span>
//             </>
//           )}
//         </CardTitle>
//         <CardDescription>
//           {paymentStatus === "paid"
//             ? "You're all set for Vercera 4.0"
//             : "Complete your registration to participate in Vercera 4.0"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {paymentStatus === "unpaid" ? (
//           <div className="flex flex-col space-y-4">
//             <p className="text-sm text-muted-foreground">
//               Registration fee: ₹{amount}
//             </p>
//             <Button onClick={handlePayment} className="w-full sm:w-auto">
//               Complete Registration
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Vercera ID</span>
//               <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
//                 {verceraId}
//               </code>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";
import useFetchPaymentStatus from "@/utils/useFetchPaymentStatus";
import Image from "next/image";

export default function PaymentStatus() {
  const { paymentDetails, loading, error } = useFetchPaymentStatus();

  const handlePayment = async () => {
    // Implement payment gateway integration here
    console.log("Processing payment...");
  };

  if (loading) {
    return <div>Loading payment status...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!paymentDetails) {
    return <div>No payment details available.</div>;
  }

  const { paymentStatus, amount, verceraId, qrCode } = paymentDetails;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {paymentStatus ? (
            <>
              <Check className="h-5 w-5 text-green-500" />
              <span>Registration Complete</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span>Registration Pending</span>
            </>
          )}
        </CardTitle>
        <CardDescription>
          {paymentStatus
            ? "You're all set for Vercera 4.0"
            : "Complete your registration to participate in Vercera 4.0"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!paymentStatus ? (
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground">
              Registration fee: ₹{amount}
            </p>
            <Button onClick={handlePayment} className="w-full sm:w-auto">
              Complete Registration
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vercera ID</span>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
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
        )}
      </CardContent>
    </Card>
  );
}
