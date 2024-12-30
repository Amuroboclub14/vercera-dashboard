import { useState } from "react";
import pb from "../lib/pocketbase.js";

export default function useCreateUser() {
  const [userName, setUserName] = useState("");

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
      };
      const record = await pb.collection("users").create(data);
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      if (authData) {
        console.log(pb.authStore.model.username);
        setUserName(pb.authStore.model.username);
      }

      console.log("User created successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return { createUser, userName };
}
