import pb from "../lib/pocketbase.js";

export async function updateProfile(userId: string, data: Record<string, any>) {
  try {
    await pb.collection("users").update(userId, data);
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: error.message };
  }
}
