import Link from "next/link";
import { EventData } from "../../lib/types";

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/event/${event.id}`}>
      <div className="border border-black rounded-lg shadow-sm bg-white overflow-hidden transition-all hover:shadow-md hover:border-blue-500 cursor-pointer">
        <div className="relative aspect-[4/5] w-full">
          {event.image ? (
            <img
              src={`http://localhost:4000/files/${event.image}`}
              alt={event.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
              Нет изображения
            </div>
          )}

          <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-1.5 py-0.5 rounded border border-black">
            12+
          </span>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold truncate">{event.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{event.location}</p>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
