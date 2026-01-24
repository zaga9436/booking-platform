"use client";

import { useSearchParams } from "next/navigation";
import { EventData } from "@/lib/types";
import EventCard from "./EventCard";

interface EventsListProps {
  events: EventData[];
}

export default function EventsList({ events }: EventsListProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");

  const filteredEvents = events.filter((event) => {
    if (category && event.category !== category) return false;

    if (date && event.date.split("T")[0] !== date) return false;

    return true;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
