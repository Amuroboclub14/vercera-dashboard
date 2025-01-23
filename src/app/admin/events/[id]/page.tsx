"use client";
import React, { use } from "react";
import { ParticipantList } from "./participant-list";
import useFetchEventDetails from "@/utils/useFetchEventDetails";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { event, loading, error } = useFetchEventDetails(unwrappedParams.id);
    
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-32 mb-4" />

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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Error loading event: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{event?.name}</h1>
      <p className="text-gray-500 mb-4">
        Date: {event?.date ? new Date(event.date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) : 'Date not available'}</p>
      <ParticipantList eventId={unwrappedParams.id} />
    </div>
  );
}
