// "use client";

// // import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
// import Loader from "@/components/added-components/loader";
// import useFetchEventDetails from "@/utils/useFetchEventDetails";
// import useEventRegister from "@/utils/useEventRegister";
// // import useCreateTeam from "@/utils/useCreateTeam";
// // import useJoinTeam from "@/utils/useJoinTeam";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import { Icons } from "@/components/ui/icons";

// export default function EventPage() {
//   const params = useParams();
//   const { event, loading, error } = useFetchEventDetails(params.id);
//   const { handleEventRegistration, registrationLoading, registrationError } =
//     useEventRegister();
//   // const {
//   //   handleCreateTeam,
//   //   team: createdTeam,
//   //   loading: creatingTeam,
//   //   error: createError,
//   // } = useCreateTeam();
//   // const {
//   //   handleJoinTeam,
//   //   team: joinedTeam,
//   //   loading: joiningTeam,
//   //   error: joinError,
//   // } = useJoinTeam();

//   // const [teamName, setTeamName] = useState("");
//   // const [teamCode, setTeamCode] = useState("");
//   // const [teamInfo, setTeamInfo] = useState(null); // Store team details
//   // const [isCreatingTeam, setIsCreatingTeam] = useState(true);

//   // // Persist team info in localStorage
//   // useEffect(() => {
//   //   const savedTeamInfo = localStorage.getItem("teamInfo");
//   //   if (savedTeamInfo) {
//   //     setTeamInfo(JSON.parse(savedTeamInfo));
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (createdTeam || joinedTeam) {
//   //     const currentTeam = createdTeam || joinedTeam;
//   //     setTeamInfo(currentTeam);
//   //     localStorage.setItem("teamInfo", JSON.stringify(currentTeam));
//   //   }
//   // }, [createdTeam, joinedTeam]);

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto">
//       <Card>
//         {/* Event Details */}
//         <div className="relative h-60 w-full overflow-hidden">
//           <Image
//             src={
//               `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
//               "/image.JPG"
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
//         {registrationError && (
//           <div className="text-center text-red-500 text-sm mb-2">
//             {registrationError}
//           </div>
//         )}
//         <CardFooter>
//           {/* <div className="space-y-4 w-full">
//             <div className="flex justify-center space-x-4">
//               <Button onClick={() => setIsCreatingTeam(true)}>
//                 Create Team
//               </Button>
//               <Button onClick={() => setIsCreatingTeam(false)}>
//                 Join Team
//               </Button>
//             </div>

//             {isCreatingTeam ? (
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Enter Team Name"
//                   value={teamName}
//                   onChange={(e) => setTeamName(e.target.value)}
//                 />
//                 <Button
//                   className="w-full"
//                   onClick={() => handleCreateTeam(event?.id, teamName)}
//                   disabled={creatingTeam}
//                 >
//                   {creatingTeam && (
//                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   Create Team
//                 </Button>
//                 {createError && (
//                   <p className="text-red-500 text-sm">{createError}</p>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Enter Team Code"
//                   value={teamCode}
//                   onChange={(e) => setTeamCode(e.target.value)}
//                 />
//                 <Button
//                   className="w-full"
//                   onClick={() => handleJoinTeam(teamCode)}
//                   disabled={joiningTeam}
//                 >
//                   {joiningTeam && (
//                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   Join Team
//                 </Button>
//                 {joinError && (
//                   <p className="text-red-500 text-sm">{joinError}</p>
//                 )}
//               </div>
//             )}
//           </div> */}
//         </CardFooter>
//       </Card>

//       {/* Team Info Container */}
//       {/* {teamInfo && (
//         <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
//           <h3 className="text-xl font-bold">Your Team</h3>
//           <p>
//             <strong>Team Name:</strong> {teamInfo.teamName}
//           </p>
//           <p>
//             <strong>Team Code:</strong> {teamInfo.teamCode}
//           </p>
//           <h4 className="mt-4 font-bold">Members:</h4>
//           <ul className="list-disc pl-4">
//             {teamInfo.members.map((member: string) => (
//               <li key={member}>{member}</li>
//             ))}
//           </ul>
//         </div>
//       )} */}
//     </div>
//   );
// }

// // "use client";

// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
// // import Loader from "@/components/added-components/loader";
// // import useFetchEventDetails from "@/utils/useFetchEventDetails";
// // import Image from "next/image";
// // import { Icons } from "@/components/ui/icons";
// // import useEventRegister from "@/utils/useEventRegister";
// // import useCreateTeam from "@/utils/useCreateTeam";
// // import useJoinTeam from "@/utils/useJoinTeam";
// // import { Input } from "@/components/ui/input";

// // export default function EventPage() {
// //   const params = useParams();
// //   const { event, loading, error } = useFetchEventDetails(params.id);
// //   const { handleEventRegistration, registrationLoading, registrationError } =
// //     useEventRegister();

// //   const {
// //     handleCreateTeam,
// //     team: createdTeam,
// //     loading: creatingTeam,
// //     error: createError,
// //   } = useCreateTeam();
// //   const {
// //     handleJoinTeam,
// //     team: joinedTeam,
// //     loading: joiningTeam,
// //     error: joinError,
// //   } = useJoinTeam();

// //   const [teamName, setTeamName] = useState("");
// //   const [teamCode, setTeamCode] = useState("");
// //   const [isCreatingTeam, setIsCreatingTeam] = useState(true);
// //   const [teamInfo, setTeamInfo] = useState(null); // Stores team info to display below the card

// //   // Clear team info on logout or session end
// //   useEffect(() => {
// //     if (!localStorage.getItem("token")) {
// //       setTeamInfo(null);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (createdTeam || joinedTeam) {
// //       // Fetch the complete team details when team is created or joined
// //       fetch(
// //         `/api/events/${event?.id}/team/${
// //           createdTeam?.teamCode || joinedTeam?.teamCode
// //         }`
// //       )
// //         .then((res) => res.json())
// //         .then((data) => setTeamInfo(data))
// //         .catch((err) => console.error("Failed to fetch team info:", err));
// //     }
// //   }, [createdTeam, joinedTeam, event]);

// //   // Prevent duplicate team names and ensure unique team codes
// //   const createTeamWithValidation = async () => {
// //     if (!teamName) return alert("Team name cannot be empty!");
// //     if (!event) return;

// //     try {
// //       const teamCode = `${teamName}_${Math.random()
// //         .toString(36)
// //         .slice(2, 6)
// //         .toUpperCase()}`;
// //       await handleCreateTeam(event.id, teamName, teamCode, event.teamSize);
// //     } catch (err) {
// //       console.error("Failed to create team:", err);
// //     }
// //   };

// //   if (loading) return <Loader />;
// //   if (error) return <p className="text-red-500">Error: {error}</p>;

// //   return (
// //     <div className="max-w-3xl mx-auto">
// //       <Card>
// //         {/* Event Image */}
// //         <div className="relative h-60 w-full overflow-hidden">
// //           <Image
// //             src={
// //               `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
// //               "/image.JPG"
// //             }
// //             alt={event?.name}
// //             width={1920}
// //             height={1080}
// //             className="object-cover w-full h-full rounded-t-xl object-top"
// //           />
// //         </div>
// //         <CardHeader>
// //           <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
// //           <CardDescription>
// //             <pre className="whitespace-pre-wrap font-sans">
// //               {event?.description}
// //             </pre>
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <div className="flex items-center space-x-2 text-sm">
// //             <CalendarIcon className="h-4 w-4" />
// //             <span>
// //               {new Date(event?.date).toLocaleDateString("en-US", {
// //                 weekday: "long",
// //                 year: "numeric",
// //                 month: "long",
// //                 day: "numeric",
// //               })}
// //             </span>
// //           </div>
// //           <div className="flex items-center space-x-2 text-sm">
// //             <ClockIcon className="h-4 w-4" />
// //             <span>
// //               {new Date(event?.time).toLocaleTimeString("en-US", {
// //                 hour: "2-digit",
// //                 minute: "2-digit",
// //                 hour12: true,
// //                 timeZone: "UTC",
// //               })}
// //             </span>
// //           </div>
// //           <div className="flex items-center space-x-2 text-sm">
// //             <UsersIcon className="h-4 w-4" />
// //             <span>Team Size: {event?.teamSize} members</span>
// //           </div>
// //           <div className="text-sm">
// //             <strong>Location:</strong> {event?.location}
// //           </div>
// //         </CardContent>
// //         {registrationError && (
// //           <div className="text-center text-red-500 text-sm mb-2">
// //             {registrationError}
// //           </div>
// //         )}
// //         <CardFooter>
// //           <div className="space-y-4 w-full">
// //             <div className="flex justify-center space-x-4">
// //               <Button onClick={() => setIsCreatingTeam(true)}>
// //                 Create Team
// //               </Button>
// //               <Button onClick={() => setIsCreatingTeam(false)}>
// //                 Join Team
// //               </Button>
// //             </div>
// //             {isCreatingTeam ? (
// //               <div className="space-y-2">
// //                 <Input
// //                   placeholder="Enter Team Name"
// //                   value={teamName}
// //                   onChange={(e) => setTeamName(e.target.value)}
// //                 />
// //                 <Button
// //                   className="w-full"
// //                   onClick={createTeamWithValidation}
// //                   disabled={creatingTeam}
// //                 >
// //                   {creatingTeam && (
// //                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
// //                   )}
// //                   Create Team
// //                 </Button>
// //                 {createError && (
// //                   <p className="text-red-500 text-sm">{createError}</p>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="space-y-2">
// //                 <Input
// //                   placeholder="Enter Team Code"
// //                   value={teamCode}
// //                   onChange={(e) => setTeamCode(e.target.value)}
// //                 />
// //                 <Button
// //                   className="w-full"
// //                   onClick={() => handleJoinTeam(teamCode)}
// //                   disabled={joiningTeam}
// //                 >
// //                   {joiningTeam && (
// //                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
// //                   )}
// //                   Join Team
// //                 </Button>
// //                 {joinError && (
// //                   <p className="text-red-500 text-sm">{joinError}</p>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </CardFooter>
// //       </Card>
// //       {teamInfo && (
// //         <div className="mt-8">
// //           <h2 className="text-xl font-bold">Team Details</h2>
// //           <p>
// //             <strong>Team Name:</strong> {teamInfo.teamName}
// //           </p>
// //           <p>
// //             <strong>Team Code:</strong> {teamInfo.teamCode}
// //           </p>
// //           <p>
// //             <strong>Members:</strong>
// //           </p>
// //           <ul>
// //             {teamInfo.members.map((member) => (
// //               <li key={member.id}>{member.name}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
// import Loader from "@/components/added-components/loader";
// import useFetchEventDetails from "@/utils/useFetchEventDetails"; // Import the custom hook
// import Image from "next/image";
// import { Icons } from "@/components/ui/icons";
// import useEventRegister from "@/utils/useEventRegister";

// export default function EventPage() {
//   const params = useParams();
//   const { event, loading, error } = useFetchEventDetails(params.id);
//   const { handleEventRegistration, registrationLoading, registrationError } =
//     useEventRegister();

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto">
//       <Card>
//         {/* Event Image */}
//         <div className="relative h-60 w-full overflow-hidden">
//           <Image
//             src={
//               `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
//               "/image.JPG"
//             } // Replace with dynamic image URL
//             alt={event?.name}
//             width={1920}
//             height={1080}
//             className="object-cover w-full h-full rounded-t-xl object-top"
//           />
//         </div>
//         <CardHeader>
//           <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
//           {/* <CardDescription>{event?.description}</CardDescription> */}
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
//                 timeZone: "UTC", // Forces UTC interpretation
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
//         {registrationError && (
//           <div className="text-center text-red-500 text-sm mb-2">
//             {registrationError}
//           </div>
//         )}
//         <CardFooter>
//           <Button
//             className="w-full"
//             onClick={() => handleEventRegistration(event?.id)}
//             disabled
//           >
//             {registrationLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Register for Event
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// "use client";

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
// import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
// import Loader from "@/components/added-components/loader";
// import useFetchEventDetails from "@/utils/useFetchEventDetails";
// import Image from "next/image";
// import GameComponent from "@/components/GameComponent";
// import BundlePayment from "@/components/BundleComponent";

// export default function EventPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { event, loading, error } = useFetchEventDetails(params.id);

//   if (loading) return <Loader />;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   const handleRegister = () => {
//     router.push(`/events/${event.id}/register`);
//   };

//   const handlePayment = () => {
//     router.push(`/events/${event.id}/payment`);
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <Card>
//         <div className="relative h-60 w-full overflow-hidden">
//           <Image
//             src={
//               `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
//               "/image.JPG"
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
//             Register for Event
//             {event?.eventCategory === "gaming"}
//           </Button>
//         </CardFooter>
//         {event?.eventCategory === "gaming" && (
//           <CardFooter className="space-x-4">
//             <Button onClick={handlePayment} className="w-full">
//               Pay Rs. {event.singleGamePrice} to register
//             </Button>
//           </CardFooter>
//         )}
//         {event?.eventCategory === "bundle" && (
//           <CardFooter className="space-x-4">
//             <Button onClick={handlePayment} className="w-full">
//               Pay Rs. {event.bundlePrice} to register
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }

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
      router.push("/coming-soon");
    } else if (event?.eventCategory === "bundle") {
      // router.push(`/events/${event.id}/payment`);
      // router.push(`/events/${event.id}/bundle-payment`);
      router.push("/coming-soon");
    } else {
      // router.push(`/events/${event.id}/register`);
      router.push("/coming-soon");
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
