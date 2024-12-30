"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";
import useLogout from "@/utils/useLogout";
import { useRouter } from "next/navigation";

type UserProfileProps = {
  userId: string;
};

type UserData = {
  name: string;
  email: string;
  enrollmentNumber: string;
  facultyNumber: string;
  phoneNumber: string;
  branch: string;
  yearOfStudy: string;
  isAMURoboclubMember: boolean;
};

export default function UserProfile({ userId }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {loggedinUser, userInfo, updateLoggedinUser} = useContext(UserContext);
  const logout = useLogout();
  const router = useRouter();
  console.log(loggedinUser);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData((prev) => (prev ? { ...prev, [name]: value } : null));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace this with your Pocketbase mutation
      // await pb.collection('users').update(userId, userData)
      setIsEditing(false);
      // fetchUserData(); // Refresh user data
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // if (!userData) {
  //   return <div className="text-white">Loading user profile...</div>;
  // }

  const handleLogout = () => {
    logout();
    updateLoggedinUser();
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg ">
        <CardHeader>
          <CardTitle className="text-2xl">User Profile</CardTitle>
          <CardDescription className="">
            View and edit your profile information
          </CardDescription>
        </CardHeader>
        {loggedinUser ? (
            <div className="mt-4 my-5 pl-5">
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Name:</p>
              <p className="w-2/3">{userInfo.name}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Email:</p>
              <p className="w-2/3">{userInfo.email}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Enrollment Number:</p>
              <p className="w-2/3">{userInfo.enrollmentNumber}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Faculty Number:</p>
              <p className="w-2/3">{userInfo.facultyNumber}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Phone Number:</p>
              <p className="w-2/3">{userInfo.phoneNumber}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Course:</p>
              <p className="w-2/3">{userInfo.course}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Branch:</p>
              <p className="w-2/3">{userInfo.department}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">Year of Study:</p>
              <p className="w-2/3">{userInfo.yearOfStudy}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold w-1/3">AMURoboclub Member:</p>
              <p className="w-2/3">{userInfo.isAMURoboclubMember ? 'Yes' : 'No'}</p>
            </div>
          </div>
          ) : (
            <p>Loading user information...</p>
          )}
        <CardContent>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key} className="text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  id={key}
                  name={key}
                  value={value.toString()}
                  onChange={handleInputChange}
                  disabled={
                    !isEditing ||
                    key === "email" ||
                    key === "isAMURoboclubMember"
                  }
                  className="mt-1 bg-white bg-opacity-20 text-white"
                />
              </div>
            ))}
          </form> */}
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <div className="space-x-2">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Edit Profile
            </Button>
          )}
        </CardFooter>
        <CardFooter>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
