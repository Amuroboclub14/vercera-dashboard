"use client";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase"; 
import { useContext } from "react";
import UserContext from "@/utils/UserContext";
type RegisterdEvents = {
  id: string;
  user: string;
  event: string;
  expand: Array<object>;
  registration_id: string;
  created: Date;
  updated: Date;
};

export default function useFetchRegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {userInfo} = useContext(UserContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        pb.autoCancellation(false);
        const records = await pb.collection("event_registrations").getFullList(500, {
          filter: `user="${userInfo?.id}"`,
          sort: "-created",
          expand: 'user, event'
        });

        const formattedEvents = records.map((record) => ({
          id: record.id,
          user: record.user,
          event: record.event,
          expand: record.expand,
          registration_id: record.registration_id,
          created: record.created,
          updated: record.updated,
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
  }, [userInfo?.id]);

  return { events, loading, error };
}
