import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase"; // Adjust the path to your PocketBase initialization file

type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
};

export default function useFetchEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        pb.autoCancellation(false);
        const records = await pb.collection("events").getFullList(500, {
          sort: "-created",
        });

        const formattedEvents = records.map((record) => ({
          id: record.id,
          name: record.name,
          description: record.description,
          date: record.date,
          time: record.date.split(" ")[1].split(".")[0],
        }));

        setEvents(formattedEvents);
        console.log(formattedEvents);
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}