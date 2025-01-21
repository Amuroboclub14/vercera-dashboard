// "use client";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon, ClockIcon } from "lucide-react";
// import useFetchRegisteredEvents from "@/utils/useFetchRegisteredEvents";

// type RegisteredEvent = {
//   id: string;
//   user: Array<string>;
//   event: Array<string>;
//   registration_id: string;
//   created: Date;
//   updated: Date;
//   expand: {
//     event: {
//       id: string;
//       name: string;
//       description: string;
//       date: string;
//     };
//   }[];
// };

// export default function RegisteredEventsPage() {
//   const {
//     events,
//     loading,
//     error,
//   }: { events: RegisteredEvent[]; loading: boolean; error: any } =
//     useFetchRegisteredEvents();

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Registered Events</h1>
//         <p className="text-muted-foreground">
//           View and manage your registered events for Vercera 4.0.
//         </p>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {events.map((e) => (
//           <Card key={e.id}>
//             <CardHeader>
//               <CardTitle className="text-xl">{e.expand.event.name}</CardTitle>
//               <CardDescription className="font-semibold">
//                 {" "}
//                 Team ID: {e.registration_id}
//               </CardDescription>
//               <CardDescription>
//                 {e.expand.event.shortDescription}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center space-x-2 text-sm">
//                 <CalendarIcon className="h-4 w-4" />
//                 <span>
//                   {new Date(e.expand.event.date).toLocaleDateString("en-US", {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               {/* <div className="flex items-center space-x-2 text-sm mt-2">
//                 <ClockIcon className="h-4 w-4" />
//                 <span>{e.expand.event.time}</span>
//               </div> */}
//             </CardContent>
//             <CardFooter>
//               <Link href={`/events/${e.expand.event.id}`} passHref>
//                 <Button variant="outline" className="w-full">
//                   View Details
//                 </Button>
//               </Link>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import useFetchRegisteredEvents from "@/utils/useFetchRegisteredEvents";

export default function RegisteredEventsPage() {
  const { events, loading, error } = useFetchRegisteredEvents();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registered Events</h1>
        <p className="text-muted-foreground">
          View and manage your registered events for Vercera 4.0.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="text-xl">
                {event.expand.event.name}
              </CardTitle>
              <CardDescription className="font-semibold">
                Team: {event.teamName}
              </CardDescription>
              <CardDescription>Team Code: {event.teamCode}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {new Date(event.expand.event.date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {new Date(event.expand.event.date).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "UTC",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <UsersIcon className="h-4 w-4" />
                <span>
                  {event.teamMembers.length} {event.expand.event.teamSize}{" "}
                  members
                </span>
              </div>
              {event.leader && (
                <div className="text-sm mt-2">
                  <span className="font-medium">Team Leader:</span>{" "}
                  {event.leader}
                </div>
              )}
              <div className="text-sm">
                <span className="font-medium">Location:</span>{" "}
                {event.expand.event.location}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.expand.event.id}`} passHref>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
