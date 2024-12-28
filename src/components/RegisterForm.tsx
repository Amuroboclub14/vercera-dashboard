"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

import useCreateUser from "@/utils/useRegister.js";

const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  enrollmentNumber: z.string(),
  facultyNumber: z.string(),
  phoneNumber: z.string(),
  department: z.string(),
  branch: z.string(),
  yearOfStudy: z.string(),
  isAMURoboclubMember: z.boolean(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {createUser, username} = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      console.log(data);
      await createUser(
        data.email,
        data.name,
        data.password,
        data.enrollmentNumber,
        data.facultyNumber,
        data.phoneNumber,
        data.department,
        data.branch,
        data.yearOfStudy,
        data.isAMURoboclubMember
      );
      // Handle successful registration (e.g., redirect to login page)
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register for Vercera 4.0</CardTitle>
        <CardDescription>
          Please fill in your details to register for Vercera 4.0
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
            <Input
              id="enrollmentNumber"
              {...register("enrollmentNumber")}
              placeholder="e.g., AB1234"
            />
            {errors.enrollmentNumber && (
              <p className="text-sm text-red-500">
                {errors.enrollmentNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="facultyNumber">Faculty Number</Label>
            <Input
              id="facultyNumber"
              {...register("facultyNumber")}
              placeholder="e.g., F1234"
            />
            {errors.facultyNumber && (
              <p className="text-sm text-red-500">
                {errors.facultyNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="+91 1234567890"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              {...register("department")}
              placeholder="Your department"
            />
            {errors.department && (
              <p className="text-sm text-red-500">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              {...register("branch")}
              placeholder="Your branch"
            />
            {errors.branch && (
              <p className="text-sm text-red-500">{errors.branch.message}</p>
            )}
          </div>
          <div className="space-y-2">
  <Label htmlFor="yearOfStudy">Year of Study</Label>
  <Select
    onValueChange={(value) => setValue("yearOfStudy", value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select your year of study" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">1st Year</SelectItem>
      <SelectItem value="2">2nd Year</SelectItem>
      <SelectItem value="3">3rd Year</SelectItem>
      <SelectItem value="4">4th Year</SelectItem>
      <SelectItem value="5">5th Year</SelectItem>
    </SelectContent>
  </Select>
  {errors.yearOfStudy && (
    <p className="text-sm text-red-500">
      {errors.yearOfStudy.message}
    </p>
  )}
</div>
<div className="space-y-2">
  <Label>Are you a member of AMURoboclub?</Label>
  <RadioGroup
    onValueChange={(value) => setValue("isAMURoboclubMember", value === "true")}
  >
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="true" id="yes" />
      <Label htmlFor="yes">Yes</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="false" id="no" />
      <Label htmlFor="no">No</Label>
    </div>
  </RadioGroup>
  {errors.isAMURoboclubMember && (
    <p className="text-sm text-red-500">
      {errors.isAMURoboclubMember.message}
    </p>
  )}
</div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
