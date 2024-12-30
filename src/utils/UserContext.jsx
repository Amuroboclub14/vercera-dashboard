"use client";
import { createContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState('');
  const [ userInfo, setUserInfo ] = useState(null);

  const updateLoggedinUser = () => {
    if (pb.authStore.record) {
      setLoggedinUser(pb.authStore.record.name);
      setUserInfo(pb.authStore.record);
    } else {
      setLoggedinUser('');
      setUserInfo();
    }
  };

  useEffect(()=>{
    updateLoggedinUser();
  },[])

  return (
    <UserContext.Provider value={{ loggedinUser, userInfo, setUserInfo, setLoggedinUser, updateLoggedinUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;