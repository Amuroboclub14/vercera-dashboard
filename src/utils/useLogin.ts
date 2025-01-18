import { useContext, useState, useCallback } from "react";
import pb from "../lib/pocketbase.js";
import UserContext from "./UserContext.jsx";

interface UseLoginReturn {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (enrollmentNumber: string, password: string) => Promise<void>;
}

const useLogin = (): UseLoginReturn => {
  const [login, setLogin] = useState<boolean>(pb.authStore.isValid);
  const { setLoggedinUser, setUserInfo } = useContext(UserContext);

  const handleLogin = useCallback(
    async (enrollmentNumber: string, password: string) => {
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(enrollmentNumber, password);
        if (authData) {
          setLogin(pb.authStore.isValid);
          setLoggedinUser(pb.authStore.record.name);
          setUserInfo(pb.authStore.record);
        }
      } catch (error: any) {
        throw new Error(error?.message || "Login failed. Please try again.");
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
