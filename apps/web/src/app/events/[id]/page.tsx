"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/ui/layout/Header";
import { getEventById, getSeatsByEvent } from "@/lib/api";
import type { EventData, SeatData } from "@/lib/types";
import SeatMap from "@/components/SeatMap";

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventData | null>(null);
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [eventData, seatsData] = await Promise.all([
            getEventById(eventId),
            getSeatsByEvent(eventId),
          ]);
          setEvent(eventData);
          setSeats(seatsData);
        } catch (error) {
          console.error("Failed to fetch event data:", error);
          setEvent(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загрузка...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Событие с ID {eventId} не найдено.
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Header />
      <main className="max-w-[1200px] mx-auto p-4 md:p-8">
        <section className="mb-8">
          <h1 className="text-4xl font-black uppercase mb-2">{event.name}</h1>
          <p className="text-lg text-gray-600 font-semibold mb-4">
            {event.location} • {formattedDate}
          </p>
          {event.description && <p className="mb-4">{event.description}</p>}
        </section>

        <SeatMap seats={seats} eventId={eventId} eventName={event.name} />
      </main>
    </div>
  );
}
