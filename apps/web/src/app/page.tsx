import Header from "@/components/ui/layout/Header";
import HeroSlider from "@/components/HeroSlider";
import CalendarFilters from "@/components/CalendarFilters";
import EventsList from "@/components/ui/EventsList";
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

    return res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();

  const heroEvent = events.length > 0 ? events[0]! : null;

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Header />
      <main className="max-w-[1200px] mx-auto p-4 md:p-8">
        <div className="mb-8">
          <HeroSlider event={heroEvent} />
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

              <EventsList events={events} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
