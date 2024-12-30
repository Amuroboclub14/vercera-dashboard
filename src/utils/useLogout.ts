import pb from "../lib/pocketbase.js";

export default function useLogout(): () => void {
  function logout(): void {
    pb.authStore.clear();
  }

  return logout;
}
