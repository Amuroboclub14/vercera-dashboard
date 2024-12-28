"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamManagement from "@/components/TeamManagement";

type EventDetailsProps = {
  eventId: string;
  userId: string;
};

type EventDetail = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rules: string[];
  guidelines: string[];
  teamSize: number;
  isRegistered: boolean;
};

export default function EventDetails({ eventId, userId }: EventDetailsProps) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [showTeamManagement, setShowTeamManagement] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      // Replace this with your Pocketbase query
      // const record = await pb.collection('events').getOne(eventId)
      // const isRegistered = await pb.collection('registrations').getFirstListItem(`event="${eventId}" && user="${userId}"`)
      // setEvent({ ...record, isRegistered: !!isRegistered })

      // Placeholder data
      setEvent({
        id: eventId,
        name: "Robotics Challenge",
        description: "Build and program a robot to complete a series of tasks.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        rules: [
          "Teams of up to 4 members",
          "Robots must be autonomous",
          "Time limit: 5 minutes",
        ],
        guidelines: ["Safety first", "Respect other teams", "Have fun!"],
        teamSize: 4,
        isRegistered: false,
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleRegister = async () => {
    try {
      // Replace this with your Pocketbase mutation
      // await pb.collection('registrations').create({ user: userId, event: eventId })
      setShowTeamManagement(true);
      fetchEventDetails(); // Refresh event details
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  if (!event) {
    return <div className="text-white">Loading event details...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white">
        <CardHeader>
          <CardTitle className="text-3xl">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={600}
            height={400}
            className="rounded-lg mb-4 object-cover"
          />
          <CardDescription className="text-purple-200 text-lg">
            {event.description}
          </CardDescription>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Rules:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {event.rules.map((rule, index) => (
                <li key={index} className="text-purple-200">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Guidelines:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {event.guidelines.map((guideline, index) => (
                <li key={index} className="text-purple-200">
                  {guideline}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-lg">
              Team Size:{" "}
              {event.teamSize === 1
                ? "Individual"
                : `Up to ${event.teamSize} members`}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {!event.isRegistered ? (
            <Button
              onClick={handleRegister}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
            >
              Register for Event
            </Button>
          ) : (
            <Button
              onClick={() => setShowTeamManagement(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Manage Team
            </Button>
          )}
        </CardFooter>
      </Card>
      {showTeamManagement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <TeamManagement
            eventId={eventId}
            userId={userId}
            teamSize={event.teamSize}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
