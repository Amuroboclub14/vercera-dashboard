"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";
import pb from "@/lib/pocketbase";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  // bio: z.string().max(160).min(4),
  enrollmentNumber: z
    .string()
    .min(1, { message: "Enrollment number is required." }),
  facultyNumber: z.string().min(1, { message: "Faculty number is required." }),
  course: z.string().min(1, { message: "course is required." }),
  // yearOfStudy: z.number().min(0, { message: "Year of study is required." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { loggedinUser, userInfo } = useContext(UserContext);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      // bio: userInfo?.bio || "",
      enrollmentNumber: userInfo?.enrollmentNumber || "",
      facultyNumber: userInfo?.facultyNumber || "",
      course: userInfo?.course || "",
      // yearOfStudy: userInfo?.yearOfStudy || 1,
    },
    mode: "onChange",
  });
  

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name,
        email: userInfo.email,
        // bio: userInfo.bio,
        enrollmentNumber: userInfo.enrollmentNumber,
        facultyNumber: userInfo.facultyNumber,
        course: userInfo.course,
        // yearOfStudy: userInfo.yearOfStudy,
      });
    }
  }, [userInfo, form]);

  async function onSubmit() {
    setIsLoading(true);
    console.log("Submitting form...");
    const formData = form.getValues(); // Get all form values at once
    const updatedData: Partial<ProfileFormValues> = {};
  
    if (formData.name !== userInfo.name) {
      updatedData.name = formData.name;
    }
    if (formData.email !== userInfo.email) {
      updatedData.email = formData.email;
    }
    if (formData.enrollmentNumber !== userInfo.enrollmentNumber) {
      updatedData.enrollmentNumber = formData.enrollmentNumber;
    }
    if (formData.facultyNumber !== userInfo.facultyNumber) {
      updatedData.facultyNumber = formData.facultyNumber;
    }
    if (formData.course !== userInfo.course) {
      updatedData.course = formData.course;
    }
    // if (formData.yearOfStudy !== userInfo.yearOfStudy) {
    //   updatedData.yearOfStudy = formData.yearOfStudy;
    // }

    console.log(updatedData);
    if (Object.keys(updatedData).length > 0) {
      try {
        await pb.collection("users").update(userInfo.id, updatedData);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="vercera-user" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. You can only change this once
                every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@amu.ac.in" {...field} />
              </FormControl>
              <FormDescription>Your university email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can @mention other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="enrollmentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Number</FormLabel>
              <FormControl>
                <Input placeholder="GH1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facultyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Number</FormLabel>
              <FormControl>
                <Input placeholder="20COB001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="computer">Computer Engineering</SelectItem>
                  <SelectItem value="electrical">
                    Electrical Engineering
                  </SelectItem>
                  <SelectItem value="Mechanical">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="civil">Civil Engineering</SelectItem>
                  <SelectItem value="chemical">Chemical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Study</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={1}>First Year</SelectItem>
                  <SelectItem value={2}>Second Year</SelectItem>
                  <SelectItem value={3}>Third Year</SelectItem>
                  <SelectItem value={4}>Fourth Year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update profile"}
        </Button>
      </form>
    </Form>
  );
}
