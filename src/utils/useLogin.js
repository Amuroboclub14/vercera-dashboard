import { useContext, useState, useCallback } from "react";
import pb from "../lib/pocketbase.js";
import UserContext from "./UserContext";

const useLogin = () => {
  const [login, setLogin] = useState(pb.authStore.isValid);
  const { setLoggedinUser } = useContext(UserContext);
  

  const handleLogin = useCallback(async (enrollmentNumber, password) => {

    try {
      const authData = await pb.collection('users').authWithPassword(enrollmentNumber, password);
      if (authData) {
        setLogin(pb.authStore.isValid);
        setLoggedinUser(pb.authStore.model.username);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setLoggedinUser]);

  return {
    login,
    setLogin,
    handleLogin,
  };
};

export default useLogin;