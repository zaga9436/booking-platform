import Header from "@/components/ui/layout/Header";
import EventCard from "@/components/ui/EventCard";
import HeroSlider from "@/components/HeroSlider";
import CalendarFilters from "@/components/CalendarFilters";
import type { EventData } from "@/lib/types";

async function getEvents(): Promise<EventData[]> {
  try {
    const res = await fetch("http://localhost:4000/events", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch events: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);

    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();

  const heroEvent: EventData | null = events.length > 0 ? events[0]! : null;

  const popularEvents = events.slice(1);

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Header />
      <main className="max-w-[1200px] mx-auto p-4 md:p-8">
        <div className="mb-8">
          <HeroSlider event={heroEvent} />{" "}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CalendarFilters />
          </div>

          <div className="lg:col-span-3">
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b border-black pb-2">
                Популярные события
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
