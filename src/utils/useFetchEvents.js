import { useState, useEffect } from "react";
import pb from "../lib/pocketbase.js";

export default function useFetchEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchEvents() {
    setLoading(true);
    try {
      pb.autoCancellation(false);
      const records = await pb.collection("events").getFullList();
      setEvents(records);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error };
}
