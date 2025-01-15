// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "@/hooks/use-toast";
// import useFetchPaymentStatus from "@/utils/useFetchPaymentStatus";

// export default function PaymentPage() {
//   const router = useRouter();
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const { paymentDetails } = useFetchPaymentStatus();

//   const paymentAmount = paymentDetails?.amount;

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       toast({
//         title: "Error",
//         description: "Please upload a payment screenshot.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Here you would typically upload the file to your server
//     // For now, we'll just simulate a successful upload
//     try {
//       // Simulating an API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       toast({
//         title: "Payment Submitted",
//         description:
//           "Your payment screenshot has been uploaded for verification.",
//       });

//       // Redirect to dashboard or confirmation page
//       router.push("/dashboard");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to upload payment screenshot. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Complete Your Payment</CardTitle>
//           <CardDescription>
//             Scan the QR code to pay and upload your payment screenshot
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex justify-center">
//             <Image
//               src={"/payment-qr.jpg"}
//               width={200}
//               height={200}
//               alt="payment-qr"
//             ></Image>
//           </div>
//           <p className="text-center font-semibold">
//             Amount: Rs. {paymentAmount}
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
//               <Input
//                 id="screenshot"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </div>
//             {preview && (
//               <div className="mt-4">
//                 <p className="text-sm text-muted-foreground mb-2">Preview:</p>
//                 <Image
//                   src={preview || "/placeholder.svg"}
//                   alt="Payment Screenshot"
//                   width={300}
//                   height={200}
//                   className="rounded-md"
//                 />
//               </div>
//             )}
//             <Button type="submit" className="w-full">
//               Submit Payment Proof
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import useFetchPaymentStatus from "@/utils/useFetchPaymentStatus";
import pb from "@/lib/pocketbase"; // Import PocketBase instance

export default function PaymentPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { paymentDetails } = useFetchPaymentStatus();

  const paymentAmount = paymentDetails?.amount;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a payment screenshot.",
        variant: "destructive",
      });
      return;
    }

    try {
      const userId = pb.authStore.model?.id; // Get logged-in user's ID

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Create a form data object for the file upload
      const formData = new FormData();
      formData.append("paymentScreenshot", file); // 'paymentScreenshot' is the field name in PocketBase

      // Update the user's entry in PocketBase
      await pb.collection("users").update(userId, formData);

      toast({
        title: "Payment Submitted",
        description:
          "Your payment screenshot has been uploaded for verification.",
      });

      // Redirect to the dashboard or confirmation page
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to upload payment screenshot:", error);
      toast({
        title: "Error",
        description: "Failed to upload payment screenshot. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>
            Scan the QR code to pay and upload your payment screenshot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Image
              src={"/payment-qr.jpg"}
              width={200}
              height={200}
              alt="payment-qr"
            ></Image>
          </div>
          <p className="text-center font-semibold">
            Amount: Rs. {paymentAmount}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Payment Screenshot"
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              Submit Payment Proof
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
