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
  AlertCircle,
  Clock,
  LogIn,
  Loader2,
} from "lucide-react";
import Loader from "@/components/added-components/loader";
import useFetchEventDetails from "@/utils/useFetchEventDetails";
import UserContext from "@/utils/UserContext"; // Import UserContext
import Image from "next/image";
import pb from "@/lib/pocketbase"; // PocketBase instance
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

// Function to generate short team code
const generateTeamCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

type TeamMember = {
  verceraId: string;
  name: string;
};

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { event, loading, error } = useFetchEventDetails(params.id);
  const { userInfo } = useContext(UserContext);
  // const [isLoading, setIsLoading] = useState(false);

  const [showRegistration, setShowRegistration] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [newTeammate, setNewTeammate] = useState("");
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [registrationKey, setRegistrationKey] = useState(0);
  const [hasValidPayment, setHasValidPayment] = useState(false);
  const [verceraPaymentStatus, setVerceraPaymentStatus] = useState(false);
  const [paymentUnderReview, setPaymentUnderReview] = useState(false);
  const [isLoadingPaymentStatus, setIsLoadingPaymentStatus] = useState(true);

  const checkVerceraPaymentStatus = async () => {
    if (!userInfo) return;
    try {
      const user = await pb
        .collection("users")
        .getFirstListItem(`verceraId="${userInfo.verceraId}"`);
      setVerceraPaymentStatus(user.paymentStatus || false);
      setPaymentUnderReview(!!user.paymentScreenshot && !user.paymentStatus);
    } catch (error) {
      console.error("Error checking Vercera payment status:", error);
      setVerceraPaymentStatus(false);
    } finally {
      setIsLoadingPaymentStatus(false);
    }
  };

  useEffect(() => {
    checkVerceraPaymentStatus();
  }, [userInfo]);

  const checkPaymentStatus = async () => {
    if (!userInfo || !event) return false;

    try {
      const user = await pb
        .collection("users")
        .getFirstListItem(`verceraId="${userInfo.verceraId}"`);

      // Check payment status based on event category
      switch (event.eventCategory) {
        case "gaming":
          switch (event.gameName.toLowerCase()) {
            case "bgmi":
              return !!user.paymentScreenshotBGMI;
            case "tekken":
              return !!user.paymentScreenshotTekken;
            case "chess":
              return !!user.paymentScreenshotChess;
            default:
              return false;
          }
        case "bundle":
          return !!user.paymentScreenshotBundle;
        default:
          return true; // Standard events don't need payment verification
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      return false;
    }
  };

  const fetchRegistrationDetails = async () => {
    if (!userInfo || !event?.id) return;

    try {
      const registrations = await pb
        .collection("eventRegistrations")
        .getList(1, 1, {
          filter: `event="${event.id}" && teamMembers~"${userInfo.verceraId}"`,
          sort: "-created",
        });

      if (registrations.items.length > 0) {
        const registration = registrations.items[0];
        setTeamName(registration.teamName);
        setTeamCode(registration.teamCode);

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
      } else {
        setTeamName("");
        setTeamCode("");
        setTeam([{ verceraId: userInfo.verceraId, name: userInfo.name }]);
      }
    } catch (error) {
      console.error("Error fetching registration:", error);
      setTeam([{ verceraId: userInfo.verceraId, name: userInfo.name }]);
    }
  };

  useEffect(() => {
    const initializeRegistration = async () => {
      if (event) {
        const paymentValid = await checkPaymentStatus();
        setHasValidPayment(paymentValid);
      }
      fetchRegistrationDetails();
    };

    initializeRegistration();
  }, [event?.id, userInfo, registrationKey]);

  const handleRegister = async () => {
    if (showRegistration) return;

    try {
      // setIsLoading(true);

      const existingRegistration = await pb
        .collection("eventRegistrations")
        .getFirstListItem(
          `event="${event?.id}" && (teamMembers~"${userInfo.verceraId}")`
        );

      if (existingRegistration) {
        alert("You are already registered for this event.");
        setRegistrationKey((prev) => prev + 1);
        return;
      }

      if (
        event?.eventCategory === "gaming" ||
        event?.eventCategory === "bundle"
      ) {
        if (!hasValidPayment) {
          const route =
            event.eventCategory === "gaming"
              ? `/events/${event.id}/payment`
              : `/events/${event.id}/payment`;
          router.push(route);
          return;
        }
      }

      setShowRegistration(true);
    } catch {
      if (
        (event?.eventCategory === "gaming" ||
          event?.eventCategory === "bundle") &&
        !hasValidPayment
      ) {
        const route =
          event.eventCategory === "gaming"
            ? `/events/${event.id}/payment`
            : `/events/${event.id}/payment`;
        router.push(route);
        return;
      }
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
        setNewTeammate("");
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
      const generatedTeamCode = generateTeamCode();
      await pb.collection("eventRegistrations").create({
        event: event?.id,
        teamName: teamName,
        teamMembers: team.map((member) => member.verceraId),
        teamCode: generatedTeamCode,
        leader: userInfo?.name,
      });

      setTeamCode(generatedTeamCode);
      alert(`Your team "${teamName}" has been registered for ${event?.name}`);
      setShowRegistration(false);
      setRegistrationKey((prev) => prev + 1); // Force re-fetch after new registration
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
        <CardFooter className="flex flex-col space-y-4">
          {!userInfo ? (
            <div className="w-full">
              <Button
                className="w-full mb-2"
                onClick={() => router.push("/login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login to Register
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                You need to login first to register for events.
              </p>
            </div>
          ) : !verceraPaymentStatus ? (
            <div className="w-full">
              <Button className="w-full mb-2" disabled>
                <AlertCircle className="mr-2 h-4 w-4" />
                Register for Event
              </Button>
              {paymentUnderReview ? (
                <div className="text-sm text-center text-orange-500 flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Your Vercera 4.0 payment is under review
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  Complete payment for Vercera 4.0 first.{" "}
                  <Link
                    href="/payment"
                    className="text-primary hover:underline"
                  >
                    Click here to pay
                  </Link>
                </p>
              )}
            </div>
          ) : (
            !showRegistration && (
              <Button onClick={handleRegister} className="w-full">
                {(event?.eventCategory === "gaming" ||
                  event?.eventCategory === "bundle") &&
                !hasValidPayment
                  ? "Proceed to Payment"
                  : "Register for Event"}
              </Button>
            )
          )}
        </CardFooter>
      </Card>
      {showRegistration &&
        (event?.eventCategory === "standard" || hasValidPayment) &&
        verceraPaymentStatus && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Event Registration</CardTitle>
              <CardDescription>
                {event?.teamSize === 1
                  ? "Register for this solo event."
                  : "Form your team and register."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                {event?.teamSize !== 1 && (
                  <div className="space-y-2">
                    <Label>Team Name</Label>
                    <Input
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>
                    {event?.teamSize === 1 ? "Participant" : "Team Members"}
                  </Label>
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
                              {event?.teamSize === 1
                                ? "(Participant)"
                                : "(Leader)"}
                            </span>
                          )}
                        </span>
                        {member.verceraId !== userInfo?.verceraId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveTeammate(member.verceraId)
                            }
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
                  disabled={
                    isRegistering ||
                    (event?.teamSize !== 1 && (!teamName || team.length < 2)) || // Team name and size check only for team events
                    team.length > (event?.teamSize || 1) // Max team size check
                  }
                >
                  {isRegistering && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isRegistering ? "Registering..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
