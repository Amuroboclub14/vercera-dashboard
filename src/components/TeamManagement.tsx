"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TeamManagementProps = {
  eventId: string;
  userId: string;
  teamSize: number;
};

type TeamMember = {
  id: string;
  name: string;
  isLeader: boolean;
};

export default function TeamManagement({
  eventId,
  userId,
  teamSize,
}: TeamManagementProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    fetchTeamInfo();
  }, [eventId, userId]);

  const fetchTeamInfo = async () => {
    try {
      // Replace this with your Pocketbase query
      // const team = await pb.collection('teams').getFirstListItem(`event="${eventId}" && members ~ "${userId}"`)
      // setTeamMembers(team.members)
      // setTeamName(team.name)
      // setTeamCode(team.code)

      // Placeholder data
      setTeamMembers([
        { id: userId, name: "Current User", isLeader: true },
        { id: "2", name: "Team Member 2", isLeader: false },
      ]);
      setTeamName("Awesome Team");
      setTeamCode("ABC123");
    } catch (error) {
      console.error("Error fetching team info:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      // Replace this with your Pocketbase mutation
      // const newTeam = await pb.collection('teams').create({
      //   name: teamName,
      //   event: eventId,
      //   members: [userId],
      //   leader: userId
      // })
      // setTeamCode(newTeam.code)
      setTeamCode("NEW123");
      fetchTeamInfo();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleJoinTeam = async () => {
    try {
      // Replace this with your Pocketbase mutation
      // await pb.collection('teams').update(teamId, {
      //   "members+": userId
      // })
      fetchTeamInfo();
    } catch (error) {
      console.error("Error joining team:", error);
    }
  };

  return (
    <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Team Management</CardTitle>
        <CardDescription className="text-purple-200">
          Create or join a team for this event
        </CardDescription>
      </CardHeader>
      <CardContent>
        {teamMembers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              Your Team: {teamName}
            </h3>
            <p className="mb-2">
              Team Code:{" "}
              <span className="font-mono bg-purple-700 px-2 py-1 rounded">
                {teamCode}
              </span>
            </p>
            <ul className="space-y-2">
              {teamMembers.map((member) => (
                <li key={member.id} className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.isLeader ? "bg-yellow-400" : "bg-purple-400"
                    }`}
                  ></span>
                  <span>
                    {member.name} {member.isLeader && "(Leader)"}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Label htmlFor="teamName" className="text-white">
                Create a Team
              </Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="mt-1 bg-white bg-opacity-20 text-white placeholder-purple-300"
              />
              <Button
                onClick={handleCreateTeam}
                className="mt-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Create Team
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Label htmlFor="joinCode" className="text-white">
                Join a Team
              </Label>
              <Input
                id="joinCode"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter team code"
                className="mt-1 bg-white bg-opacity-20 text-white placeholder-purple-300"
              />
              <Button
                onClick={handleJoinTeam}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Join Team
              </Button>
            </motion.div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-purple-200">Maximum team size: {teamSize}</p>
      </CardFooter>
    </Card>
  );
}
