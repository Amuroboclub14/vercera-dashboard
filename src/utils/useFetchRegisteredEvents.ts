"use client";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useContext } from "react";
import UserContext from "@/utils/UserContext";

type RegisteredEvent = {
  id: string;
  event: string;
  teamName: string;
  teamCode: string;
  teamMembers: string[];
  leader: string;
  created: string;
  updated: string;
  expand: {
    event: {
      id: string;
      name: string;
      description: string;
      date: string;
      time: string;
      location: string;
      teamSize: number;
      eventCategory: string;
    };
  };
};

export default function useFetchRegisteredEvents() {
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userInfo?.verceraId) return;

      try {
        pb.autoCancellation(false);
        const records = await pb.collection("eventRegistrations").getFullList({
          filter: `teamMembers~"${userInfo.verceraId}"`,
          sort: "-created",
          expand: "event",
        });

        const formattedEvents = records.map((record) => ({
          id: record.id,
          event: record.event,
          teamName: record.teamName,
          teamCode: record.teamCode,
          teamMembers: record.teamMembers,
          leader: record.leader,
          created: record.created,
          updated: record.updated,
          expand: {
            event: record.expand?.event,
          },
        }));

        setEvents(formattedEvents);
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userInfo?.verceraId]);

  return { events, loading, error };
}
