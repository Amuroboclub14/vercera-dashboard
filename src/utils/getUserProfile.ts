import pb from "@/lib/pocketbase"; // Assuming you're using PocketBase for user data

export async function getUserProfile(userId: string) {
  try {
    // Fetch user profile from your PocketBase collection
    const userProfile = await pb.collection("users").getOne(userId);
    console.log(userProfile.name);
    return {
      name: userProfile.name || "",
      phoneNo: userProfile.phoneNo || "",
      course: userProfile.course || "",
      department: userProfile.department || "",
      yearOfStudy: userProfile.yearOfStudy || "",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
}
