"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  PlusCircle,
  X,
} from "lucide-react";
import Loader from "@/components/added-components/loader";
import useFetchEventDetails from "@/utils/useFetchEventDetails";
import UserContext from "@/utils/UserContext"; // Import UserContext
import Image from "next/image";
import pb from "@/lib/pocketbase"; // PocketBase instance
import { v4 as uuidv4 } from "uuid"; // To generate unique team codes

type TeamMember = {
  verceraId: string;
  name: string;
};

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { event, loading, error } = useFetchEventDetails(params.id);
  const { userInfo } = useContext(UserContext);

  const [showRegistration, setShowRegistration] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [newTeammate, setNewTeammate] = useState("");
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [teamCode, setTeamCode] = useState("");

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      if (userInfo) {
        try {
          const registration = await pb
            .collection("eventRegistrations")
            .getFirstListItem(
              `event="${event?.id}" && teamMembers~"${userInfo.verceraId}"`
            );

          setTeamName(registration.teamName);
          setTeamCode(registration.teamCode);
          setTeam(
            registration.teamMembers.map((verceraId: string) => ({
              verceraId,
              name: "Loading...", // Placeholder while fetching names
            }))
          );

          const teammates = await Promise.all(
            registration.teamMembers.map(async (id: string) => {
              const user = await pb
                .collection("users")
                .getFirstListItem(`verceraId="${id}"`);
              return { verceraId: id, name: user.name };
            })
          );

          setTeam(teammates);
          setShowRegistration(true);
        } catch {
          setTeam([{ verceraId: userInfo.verceraId, name: userInfo.name }]);
        }
      }
    };

    fetchRegistrationDetails();
  }, [event?.id, userInfo]);

  const handleRegister = async () => {
    if (showRegistration) return; // Prevent re-registering if already registered

    if (event?.eventCategory === "gaming") {
      router.push(`/events/${event.id}/payment`);
    } else if (event?.eventCategory === "bundle") {
      router.push(`/events/${event.id}/bundle-payment`);
    } else {
      setShowRegistration(true);
    }
  };

  const handleAddTeammate = async () => {
    if (newTeammate && team.length < (event?.teamSize || 1)) {
      if (team.some((member) => member.verceraId === newTeammate)) {
        alert("This teammate is already added.");
        return;
      }

      try {
        const userRecord = await pb
          .collection("users")
          .getFirstListItem(`verceraId="${newTeammate}"`);

        setTeam([
          ...team,
          { verceraId: userRecord.verceraId, name: userRecord.name },
        ]);
        setNewTeammate(""); // Reset input
      } catch (error) {
        alert(error.status === 404 ? "User not found." : "An error occurred.");
      }
    }
  };

  const handleRemoveTeammate = (verceraId: string) => {
    if (verceraId === userInfo?.verceraId) {
      alert("You cannot remove yourself as the leader.");
      return;
    }
    setTeam(team.filter((member) => member.verceraId !== verceraId));
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      const generatedTeamCode = uuidv4(); // Generate a unique team code
      await pb.collection("eventRegistrations").create({
        event: event?.id,
        teamName: teamName,
        teamMembers: team.map((member) => member.verceraId),
        teamCode: generatedTeamCode,
        leader: userInfo?.name, // Add leader's name
      });

      setTeamCode(generatedTeamCode); // Store the generated team code locally
      alert(`Your team "${teamName}" has been registered for ${event?.name}`);
      setShowRegistration(false);
    } catch {
      alert("Error registering your team.");
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error loading event details.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={
              `https://amuroboclub.pockethost.io/api/files/events/${
                event?.id || "/placeholder.svg"
              }/${event?.image}` || "/image.JPG"
            }
            alt={event?.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full rounded-t-xl object-top"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
          <CardDescription>
            <pre className="whitespace-pre-wrap font-sans">
              {event?.description}
            </pre>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event details */}
          <div className="flex items-center space-x-2 text-sm">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(event?.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" />
            <span>
              {new Date(event?.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "UTC",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <UsersIcon className="h-4 w-4" />
            <span>Team Size: {event?.teamSize} members</span>
          </div>
          <div className="text-sm">
            <strong>Location:</strong> {event?.location}
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          {!showRegistration && (
            <Button onClick={handleRegister} className="w-full">
              Register for Event
            </Button>
          )}
        </CardFooter>
      </Card>
      {showRegistration && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Event Registration</CardTitle>
            <CardDescription>Form your team and register.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRegistration} className="space-y-4">
              <div className="space-y-2">
                <Label>Team Name</Label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Team Members</Label>
                <ul className="space-y-2">
                  {team.map((member) => (
                    <li
                      key={member.verceraId}
                      className="flex items-center justify-between bg-secondary p-2 rounded"
                    >
                      <span>
                        {member.name} ({member.verceraId})
                        {member.verceraId === userInfo?.verceraId && (
                          <span className="ml-2 text-xs font-semibold text-primary">
                            (Leader)
                          </span>
                        )}
                      </span>
                      {member.verceraId !== userInfo?.verceraId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTeammate(member.verceraId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {team.length < (event?.teamSize || 1) && (
                <div className="flex space-x-2">
                  <Input
                    value={newTeammate}
                    onChange={(e) => setNewTeammate(e.target.value)}
                    placeholder="Enter teammate's Vercera ID"
                  />
                  <Button type="button" onClick={handleAddTeammate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isRegistering || !teamName || team.length < 2}
              >
                {isRegistering ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
