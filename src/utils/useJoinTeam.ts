import { useState } from "react";
import pb from "@/lib/pocketbase";

export default function useJoinTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<any>(null);

  const handleJoinTeam = async (teamCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const userId = pb.authStore.model?.id; // Get the logged-in user's ID
      if (!userId) throw new Error("User is not logged in.");

      // Fetch the team by the unique team code
      const team = await pb
        .collection("teams")
        .getFirstListItem(`teamCode="${teamCode}"`);

      // Check if the team is full
      if (team.members.length >= team.maxMembers) {
        throw new Error("Team is already full.");
      }

      // Add the user to the team's member list
      const updatedTeam = await pb.collection("teams").update(team.id, {
        members: [...team.members, userId],
      });

      setTeam(updatedTeam);
    } catch (err: any) {
      setError(err.message || "Failed to join team.");
    } finally {
      setLoading(false);
    }
  };

  return { team, loading, error, handleJoinTeam };
}
