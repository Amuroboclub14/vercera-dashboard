import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";

type Participants = {
    id: string;
    event: string;
    teamName: string;
    teamMembers: string[];
    teamCode: string;
    leader: string;
    attended: boolean;
    created?: string;
    updated?: string;
    expand?: {
      event: {
        name: string;
        description: string;
        date: string;
        time: string;
        location: string;
        teamSize: number;
      };
    };
  }


export default function useFetchParticipants({eventId}: {eventId: string}) {
    const [participants, setParticipants] = useState<Participants[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchParticipants = async () => {
        try {
          pb.autoCancellation(false);
          const records = await pb.collection('eventRegistrations').getFullList({
            filter: `event="${eventId}"`,
        });
        console.log(eventId);
          const formattedParticipants = records.map((record) => ({
            id: record.id,
            event: record.event,
            teamName: record.teamName,
            teamMembers: record.teamMembers,
            teamCode: record.teamCode,
            leader: record.leader,
            attended: record.attended,
          }));
  
          setParticipants(formattedParticipants);
          console.log(records);
        } catch (err: any) {
          console.error("Error fetching events:", err);
          setError("Failed to fetch events. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchParticipants();
    }, []);
    return { participants, loading, error };
  }