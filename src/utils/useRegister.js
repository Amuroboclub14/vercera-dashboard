// import { useState } from "react";
// import pb from "../lib/pocketbase.js";
// import QRCode from "qrcode";

// export default function useCreateUser() {
//   const [userName, setUserName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to generate unique VarceraId
//   const generateVerceraId = (enrollmentNumber) => {
//     const timestamp = Date.now().toString().slice(-2);
//     const randomNum = Math.floor(Math.random() * 100)
//       .toString()
//       .padStart(2, "0");
//     return `V${enrollmentNumber.slice(0, 3)}${timestamp}${randomNum}`;
//   };

//   // Function to generate QR code
//   const generateQRCode = async (verceraId) => {
//     try {
//       const qrCodeDataUrl = await QRCode.toDataURL(verceraId);
//       return qrCodeDataUrl;
//     } catch (error) {
//       console.error("Error generating QR code:", error);
//       throw error;
//     }
//   };

//   async function createUser(
//     email,
//     name,
//     password,
//     enrollmentNumber,
//     facultyNumber,
//     phoneNo,
//     course,
//     department,
//     yearOfStudy,
//     isAMURoboclubMember
//   ) {
//     try {
//       setIsLoading(true);

//       // Generate VerceraId
//       const verceraId = generateVerceraId(enrollmentNumber);

//       // Generate QR code
//       const qrCode = await generateQRCode(verceraId);

//       const data = {
//         name: name,
//         email: email,
//         emailVisibility: true,
//         password: password,
//         passwordConfirm: password,
//         enrollmentNumber: enrollmentNumber,
//         facultyNumber: facultyNumber,
//         phoneNo: phoneNo,
//         course: course,
//         department: department,
//         yearOfStudy: yearOfStudy,
//         isAMURoboclubMember: isAMURoboclubMember,
//         verceraId: verceraId,
//         qrCode: qrCode,
//       };

//       const record = await pb.collection("users").create(data);
//       const authData = await pb
//         .collection("users")
//         .authWithPassword(email, password);

//       if (authData) {
//         console.log(pb.authStore.model.username);
//         setUserName(pb.authStore.model.username);
//       }

//       console.log("User created successfully with VerceraId:", verceraId);
//       return { verceraId, qrCode };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return { createUser, userName, isLoading };
// }
