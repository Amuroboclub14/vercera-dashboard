"use client";

import { useState, useEffect } from "react";

type EventDetail = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  teamSize: number;
  //   location: string;
};

export default function useFetchEventDetails(eventId: string | undefined) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://amuroboclub.pockethost.io/api/collections/events/records/${eventId}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch event: ${res.statusText}`);
        }
        const data = await res.json();
        setEvent({
          id: data.id,
          name: data.name,
          description: data.description,
          date: data.date,
          time: data.date.split(" ")[1].split(".")[0],
          teamSize: data.max_team_members, // Adjust field names to match your API
          //   location: data.location,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return { event, loading, error };
}
