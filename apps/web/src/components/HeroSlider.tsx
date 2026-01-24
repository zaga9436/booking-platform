"use client";

import Link from "next/link";
import { EventData } from "../lib/types";
import { Button } from "@/components/ui/button";

interface HeroSliderProps {
  event: EventData | null;
}

export default function HeroSlider({ event }: HeroSliderProps) {
  if (!event) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Нет доступных событий</p>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
  const formattedTime = new Date(event.date).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {event.image ? (
        <img
          src={`http://localhost:4000/files/${event.image}`}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
          Нет изображения
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
        <h2 className="text-4xl font-black uppercase mb-2">{event.name}</h2>
        <p className="text-lg mb-4">
          {formattedDate}, {formattedTime}, {event.location}
        </p>
        <Link href={`/events/${event.id}`}>
          <Button className="rounded-none border-2 border-white bg-yellow-400 text-black font-bold hover:bg-yellow-500 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transition-all">
            Купить билеты
          </Button>
        </Link>
      </div>
    </div>
  );
}
