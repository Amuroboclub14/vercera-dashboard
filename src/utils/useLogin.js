import { useContext, useState, useCallback } from "react";
import pb from "../lib/pocketbase.js";
import UserContext from "./UserContext";

const useLogin = () => {
  const [login, setLogin] = useState(pb.authStore.isValid);
  const { setLoggedinUser } = useContext(UserContext);

  const handleLogin = useCallback(
    async (enrollmentNumber, password) => {
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(enrollmentNumber, password);
        if (authData) {
          setLogin(pb.authStore.isValid);

          // Store the full user object or specific user details
          const user = pb.authStore.model;
          setLoggedinUser({
            username: user.username,
            email: user.email,
            enrollmentNumber: user.enrollmentNumber,
            phoneNo: user.phoneNo,
            // Add other user fields as needed
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [setLoggedinUser]
  );

  return {
    login,
    setLogin,
    handleLogin,
  };
};

export default useLogin;
