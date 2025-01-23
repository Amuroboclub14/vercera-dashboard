"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchParticipants  from "@/utils/useFetchParticipants";
import pb from "@/lib/pocketbase";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ParticipantList({ eventId }: { eventId: string;}) {

  const [attendedId, setAttendedId] = useState<string[]>([]); 
  const {participants, loading, error} = useFetchParticipants({eventId});

  const toggleAttendance = (participantId: string) => {
    setAttendedId((prev) => {
      const isAttended = prev.includes(participantId);
      
      if (isAttended) {
        const filtered = prev.filter(id => id !== participantId);
        console.log('Removed ID:', participantId, 'New array:', filtered);
        return filtered;
      }
      
      const newArray = [...prev, participantId];
      console.log('Added ID:', participantId, 'New array:', newArray);
      return newArray;
    });
  };

  const saveAttendance = async () => {
    try {
      // Update attendance in database
      await Promise.all(
        attendedId?.map(id =>
          pb.collection('eventRegistrations').update(id, {
            attended: true
          })
        )
      );
      toast({
        title: "Success",
        description: "Attendance saved successfully"
      });
    } catch (error) {
      console.error("Failed to save attendance:", error);
      toast({
        title: "Error",
        description: "Failed to save attendance",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (participants.length > 0) {
      setAttendedId(participants.filter(p => p.attended).map(p => p.id));
    }
  }, [participants]);


  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((header) => (
            <Skeleton key={`header-${header}`} className="h-8 w-full" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={`row-${row}`} className="grid grid-cols-3 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-24" /> {/* Checkbox column */}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading participants: {error}</div>;
  }


  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Leader</TableHead>
            <TableHead>Attended</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.teamName}</TableCell>
              <TableCell>{participant.leader}</TableCell>
              <TableCell>
                <Checkbox
                  checked={attendedId.includes(participant.id)}
                  onCheckedChange={() => toggleAttendance(participant.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={saveAttendance}>
        Save Attendance
      </Button>
    </div>
  );
}
