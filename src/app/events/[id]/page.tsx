"use client";

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
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import Loader from "@/components/added-components/loader";
import useFetchEventDetails from "@/utils/useFetchEventDetails";
import Image from "next/image";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { event, loading, error } = useFetchEventDetails(params.id);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleAction = () => {
    if (event?.eventCategory === "gaming") {
      // router.push(`/events/${event.id}/payment`);
      router.push("/regsiter");
      // router.push("/coming-soon");
    } else if (event?.eventCategory === "bundle") {
      // router.push(`/events/${event.id}/payment`);
      // router.push(`/events/${event.id}/bundle-payment`);
      // router.push("/coming-soon");
      router.push("/register");
    } else {
      // router.push(`/events/${event.id}/register`);
      // router.push("/coming-soon");
      router.push("/register");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={
              `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
              "/image.JPG"
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
          <Button onClick={handleAction} className="w-full">
            {event?.eventCategory === "gaming"
              ? `Pay Rs. ${event.singleGamePrice} for this game`
              : event?.eventCategory === "bundle"
              ? "Pay Rs. 90 for bundle"
              : "Register for Event"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   CalendarIcon,
//   ClockIcon,
//   UsersIcon,
//   PlusCircle,
//   X,
// } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";
// import Loader from "@/components/added-components/loader";
// import useFetchEventDetails from "@/utils/useFetchEventDetails";
// import Image from "next/image";
// import { useAuth } from "@/utils/useAuth"; // Assuming you have an auth hook

// type TeamMember = {
//   verceraId: string;
//   name: string;
// };

// // This would typically come from your authentication context
// //const LOGGED_IN_USER_VERCERA_ID = "USER123"

// export default function EventPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { event, loading, error } = useFetchEventDetails(params.id);
//   const { user } = useAuth(); // Assuming you have an auth hook

//   const [showRegistration, setShowRegistration] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [newTeammate, setNewTeammate] = useState("");
//   const [team, setTeam] = useState<TeamMember[]>([]);
//   const [isRegistering, setIsRegistering] = useState(false);

//   useEffect(() => {
//     //fetchEventDetails()
//     // Add logged-in user as team lead
//     if (user) {
//       setTeam([{ verceraId: user.id, name: user.name }]);
//     }
//   }, [params.id, user]);

//   const handleRegister = () => {
//     if (event?.eventCategory === "gaming") {
//       router.push(`/events/${event.id}/payment`);
//     } else if (event?.eventCategory === "bundle") {
//       router.push(`/events/${event.id}/bundle-payment`);
//     } else {
//       setShowRegistration(true);
//       setTeam([{ verceraId: user?.id, name: user?.name }]); // Add logged-in user as team lead
//     }
//   };

//   const handleAddTeammate = async () => {
//     if (newTeammate && team.length < (event?.teamSize || 1)) {
//       try {
//         const userRecord = await pb.collection("users").getOne(newTeammate);
//         setTeam([...team, { verceraId: userRecord.id, name: userRecord.name }]);
//         setNewTeammate("");
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         toast({
//           title: "User Not Found",
//           description: "Unable to find a user with the provided Vercera ID.",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   const handleRemoveTeammate = (verceraId: string) => {
//     setTeam(team.filter((member) => member.verceraId !== verceraId));
//   };

//   const handleSubmitRegistration = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsRegistering(true);

//     try {
//       await pb.collection("registrations").create({
//         event: event?.id,
//         teamName: teamName,
//         teamMembers: team.map((member) => member.verceraId),
//       });

//       toast({
//         title: "Registration Successful",
//         description: `Your team "${teamName}" has been registered for ${event?.name}`,
//       });

//       setShowRegistration(false);
//       setTeamName("");
//       setTeam([{ verceraId: user?.id, name: user?.name }]);
//     } catch (error) {
//       console.error("Error registering for event:", error);
//       toast({
//         title: "Registration Failed",
//         description:
//           "There was an error registering for the event. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Error loading event details</div>;
//   }

//   if (!event) {
//     return <div>Event not found</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <Card>
//         <div className="relative h-60 w-full overflow-hidden">
//           <Image
//             src={
//               `https://amuroboclub.pockethost.io/api/files/events/${
//                 event?.id || "/placeholder.svg"
//               }/${event?.image}` || "/image.JPG"
//             }
//             alt={event?.name}
//             width={1920}
//             height={1080}
//             className="object-cover w-full h-full rounded-t-xl object-top"
//           />
//         </div>
//         <CardHeader>
//           <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
//           <CardDescription>
//             <pre className="whitespace-pre-wrap font-sans">
//               {event?.description}
//             </pre>
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center space-x-2 text-sm">
//             <CalendarIcon className="h-4 w-4" />
//             <span>
//               {new Date(event?.date).toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 text-sm">
//             <ClockIcon className="h-4 w-4" />
//             <span>
//               {new Date(event?.time).toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//                 timeZone: "UTC",
//               })}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 text-sm">
//             <UsersIcon className="h-4 w-4" />
//             <span>Team Size: {event?.teamSize} members</span>
//           </div>
//           <div className="text-sm">
//             <strong>Location:</strong> {event?.location}
//           </div>
//         </CardContent>
//         <CardFooter className="space-x-4">
//           <Button onClick={handleRegister} className="w-full">
//             {event?.eventCategory === "gaming"
//               ? `Pay Rs. ${event.singleGamePrice} for this game`
//               : event?.eventCategory === "bundle"
//               ? "Pay Rs. 90 for bundle"
//               : "Register for Event"}
//           </Button>
//         </CardFooter>
//       </Card>

//       {showRegistration && (
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>Event Registration</CardTitle>
//             <CardDescription>
//               Form your team and register for this event.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmitRegistration} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="teamName">Team Name</Label>
//                 <Input
//                   id="teamName"
//                   value={teamName}
//                   onChange={(e) => setTeamName(e.target.value)}
//                   placeholder="Enter your team name"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Team Members</Label>
//                 <ul className="space-y-2">
//                   {team.map((member) => (
//                     <li
//                       key={member.verceraId}
//                       className="flex items-center justify-between bg-secondary p-2 rounded"
//                     >
//                       <span>
//                         {member.name} ({member.verceraId})
//                       </span>
//                       {member.verceraId !== user?.id && (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleRemoveTeammate(member.verceraId)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               {team.length < (event?.teamSize || 1) && (
//                 <div className="flex space-x-2">
//                   <Input
//                     value={newTeammate}
//                     onChange={(e) => setNewTeammate(e.target.value)}
//                     placeholder="Enter teammate's Vercera ID"
//                   />
//                   <Button type="button" onClick={handleAddTeammate}>
//                     <PlusCircle className="h-4 w-4 mr-2" />
//                     Add
//                   </Button>
//                 </div>
//               )}
//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={isRegistering || team.length < 2 || !teamName}
//               >
//                 {isRegistering ? "Registering..." : "Complete Registration"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
