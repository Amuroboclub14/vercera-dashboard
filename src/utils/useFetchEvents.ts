import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase"; // Adjust the path to your PocketBase initialization file

type Event = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  description: string;
  date: string;
  time: string;
  eventCategory: string;
  singleGamePrice?: number; // Optional field for gaming events
  bundlePrice?: number; // Optional field for gaming bundle
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
          sort: "+date",
        });

        const formattedEvents = records.map((record) => ({
          id: record.id,
          name: record.name,
          shortDescription: record.shortDescription,
          description: record.description.replace(/\n/g, "<br />"),
          image: record.image,
          date: record.date,
          time: record.date,
          eventCategory: record.eventCategory,
          singleGamePrice: record.singleGamePrice ?? null, // Optional
          bundlePrice: record.bundlePrice ?? null, // Optional
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
