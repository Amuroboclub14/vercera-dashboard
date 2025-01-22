"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import useLogin from "@/utils/useLogin";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  enrollmentNumber: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "Invalid enrollment number")
    .transform((val) => val.toUpperCase()),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  const { handleLogin, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null); // Reset previous errors

    console.log(data);
    try {
      await handleLogin(data.enrollmentNumber, data.password);
      // Handle successful login (e.g., redirect to dashboard)
      console.log("Login successful");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setAuthError(error.message || "Invalid login credentials.");
      console.log(error);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login to Vercera 4.0</CardTitle>
        <CardDescription>
          Enter your credentials to access the portal to Vercera 4.0
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        {authError && (
          <div
            className={`p-4 mb-4 text-white rounded ${
              authError.includes("successful") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {authError}
          </div>
        )}
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
