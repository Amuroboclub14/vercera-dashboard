import { useState, useContext } from "react";
import pb from "../lib/pocketbase.js";
import QRCode from "qrcode";
import UserContext from "../utils/UserContext.jsx";


export default function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setLoggedinUser} = useContext(UserContext);

  // Function to generate unique VarceraId
  const generateVerceraId = (enrollmentNumber) => {
    const timestamp = Date.now().toString().slice(-2);
    const randomNum = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    return `V${enrollmentNumber.slice(0, 3)}${timestamp}${randomNum}`;
  };

  // Function to generate QR code
  const generateQRCode = async (verceraId) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(verceraId);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  };

  async function createUser(
    email,
    name,
    password,
    enrollmentNumber,
    facultyNumber,
    phoneNo,
    course,
    department,
    yearOfStudy,
    isAMURoboclubMember
  ) {
    try {
      setIsLoading(true);

      // Generate VerceraId
      const verceraId = generateVerceraId(enrollmentNumber);

      // Generate QR code
      const qrCode = await generateQRCode(verceraId);

      const data = {
        name: name,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: password,
        enrollmentNumber: enrollmentNumber,
        facultyNumber: facultyNumber,
        phoneNo: phoneNo,
        course: course,
        department: department,
        yearOfStudy: yearOfStudy,
        isAMURoboclubMember: isAMURoboclubMember,
        verceraId: verceraId,
        qrCode: qrCode,
      };

      const record = await pb.collection("users").create(data);
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      if (authData) {
        setLoggedinUser(pb.authStore.record.username);
      }

      return { verceraId, qrCode };
    } catch (error) {
      // console.log(Object.keys(error.response.data)[0]);
      // console.log(error.response.data[Object.keys(error.response.data)[0]].message);
      setError(`${Object.keys(error.response.data)[0]}: ${error.response.data[Object.keys(error.response.data)[0]].message}`);
      return error;
    } finally {
      setIsLoading(false);
    }
  }

  return { createUser, error, isLoading };
}
