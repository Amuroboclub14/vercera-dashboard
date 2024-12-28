"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RegisteredEventsProps = {
  userId: string;
};

type Event = {
  id: string;
  name: string;
  description: string;
};

export default function RegisteredEvents({ userId }: RegisteredEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchRegisteredEvents();
  }, [userId]);

  const fetchRegisteredEvents = async () => {
    try {
      // Replace this with your Pocketbase query
      // const records = await pb.collection('registrations').getFullList({
      //   filter: `user="${userId}"`,
      //   expand: 'event'
      // })
      // setEvents(records.map(r => r.expand.event))

      // Placeholder data
      setEvents([
        {
          id: "1",
          name: "Robotics Challenge",
          description: "Build and program a robot to complete tasks.",
        },
        {
          id: "2",
          name: "Hackathon",
          description:
            "24-hour coding competition to solve real-world problems.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-200">
                {event.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} passHref>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
