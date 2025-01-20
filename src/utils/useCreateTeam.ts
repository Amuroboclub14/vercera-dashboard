// import { useState } from "react";
// import pb from "@/lib/pocketbase";

// export default function useCreateTeam() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [team, setTeam] = useState<any>(null);

//   const handleCreateTeam = async (eventId: string, teamName: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userId = pb.authStore.model?.id; // Get the logged-in user's ID
//       if (!userId) throw new Error("User is not logged in.");

//       const response = await pb.collection("teams").create({
//         teamName,
//         event: eventId,
//         leader: userId,
//         members: [userId], // Add the leader as the first member
//       });

//       setTeam(response);
//     } catch (err: any) {
//       setError(err.message || "Failed to create team.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { team, loading, error, handleCreateTeam };
// }

import { useState } from "react";
import pb from "@/lib/pocketbase";

export default function useCreateTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<any>(null);

  // Function to generate a unique team code
  const generateUniqueTeamCode = async (
    baseCode: string,
    eventId: string
  ): Promise<string> => {
    let uniqueCode = baseCode;
    let isUnique = false;

    while (!isUnique) {
      // Check if the teamCode exists in the teams collection for the given event
      const existingTeams = await pb.collection("teams").getFullList(1, {
        filter: `event = "${eventId}" && teamCode = "${uniqueCode}"`,
      });

      if (existingTeams.length === 0) {
        isUnique = true; // No matching team code found
      } else {
        // Regenerate the code with a random suffix
        uniqueCode = `${baseCode}-${Math.floor(Math.random() * 10000)}`;
      }
    }

    return uniqueCode;
  };

  const handleCreateTeam = async (eventId: string, teamName: string) => {
    setLoading(true);
    setError(null);

    try {
      const userId = pb.authStore.model?.id; // Get the logged-in user's ID
      if (!userId) throw new Error("User is not logged in.");

      // Generate a base code for the team
      const baseTeamCode = `${teamName.toLowerCase().replace(/\s+/g, "-")}`;

      // Ensure the teamCode is unique
      const teamCode = await generateUniqueTeamCode(baseTeamCode, eventId);

      // Create the team with the unique teamCode
      const response = await pb.collection("teams").create({
        teamName,
        event: eventId,
        leader: userId,
        members: [userId], // Add the leader as the first member
        teamCode, // Add the unique team code
      });

      setTeam(response);
    } catch (err: any) {
      setError(err.message || "Failed to create team.");
    } finally {
      setLoading(false);
    }
  };

  return { team, loading, error, handleCreateTeam };
}
