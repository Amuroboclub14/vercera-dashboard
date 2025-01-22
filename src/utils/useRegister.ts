import { useState } from "react";
import pb from "../lib/pocketbase";
import QRCode from "qrcode";

export default function useCreateUser() {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to generate unique VerceraId
  const generateVerceraId = (enrollmentNumber: string) => {
    const timestamp = Date.now().toString().slice(-2);
    const randomNum = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    return `V${enrollmentNumber.slice(0, 3)}${timestamp}${randomNum}`;
  };

  // Function to generate QR code
  const generateQRCode = async (verceraId: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(verceraId);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw new Error("Failed to generate QR code.");
    }
  };

  async function createUser(
    email: string,
    name: string,
    password: string,
    enrollmentNumber: string,
    facultyNumber: string,
    phoneNo: string,
    course: string,
    department: string,
    yearOfStudy: string,
    isAMURoboclubMember: boolean
  ) {
    try {
      setIsLoading(true);

      // Generate VerceraId and QR code
      const verceraId = generateVerceraId(enrollmentNumber);
      const qrCode = await generateQRCode(verceraId);

      // Prepare user data
      const data = {
        name,
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
        enrollmentNumber,
        facultyNumber,
        phoneNo,
        course,
        department,
        yearOfStudy,
        isAMURoboclubMember,
        verceraId,
        qrCode,
      };

      // Create user in PocketBase
      const record = await pb.collection("users").create(data);

      // Authenticate user
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      if (authData) {
        setUserName(pb.authStore.model.username);
      }

      console.log("User created successfully with VerceraId:", verceraId);
      return { verceraId, qrCode };
    } catch (error: any) {
      console.error("Registration error details:", error);
      if (error?.data?.message) {
        throw new Error(`Registration failed: ${error.data.message}`);
      }
      throw new Error("An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  }

  return { createUser, userName, isLoading };
}
