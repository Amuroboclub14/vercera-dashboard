"use client";

import { createContext, useEffect, useState } from "react";
import pb from "../lib/pocketbase";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState(null); // Stores the full user object
  const [userInfo, setUserInfo] = useState(null); // Stores additional user details if needed

  const updateLoggedinUser = () => {
<<<<<<< Updated upstream
    if (pb.authStore.record) {
      setLoggedinUser(pb.authStore.record.name);
      setUserInfo(pb.authStore.record);
=======
    const user = pb.authStore.model;
    if (user) {
      setLoggedinUser(user); // Store the full user object
      setUserInfo({
        username: user.username,
        email: user.email,
        enrollmentNumber: user.enrollmentNumber,
        phoneNo: user.phoneNo,
        // Add other user fields as needed
      });
>>>>>>> Stashed changes
    } else {
      setLoggedinUser(null);
      setUserInfo(null);
    }
  };

<<<<<<< Updated upstream
  useEffect(()=>{
    updateLoggedinUser();
  },[])

  return (
    <UserContext.Provider value={{ loggedinUser, userInfo, setUserInfo, setLoggedinUser, updateLoggedinUser }}>
=======
  useEffect(() => {
    // Automatically sync user state on component mount
    updateLoggedinUser();

    // Listen to PocketBase auth changes
    const unsubscribe = pb.authStore.onChange(() => {
      updateLoggedinUser();
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedinUser,
        userInfo,
        setLoggedinUser,
        updateLoggedinUser,
      }}
    >
>>>>>>> Stashed changes
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
