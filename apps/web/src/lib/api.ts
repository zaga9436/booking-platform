import type { EventData, SeatData } from "./types";

const API_URL = "http://localhost:4000";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }
  return res.json();
};

export async function getEvents(category?: string): Promise<EventData[]> {
  const url = category
    ? `${API_URL}/events?category=${category}`
    : `${API_URL}/events`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    return handleResponse(res);
  } catch (error) {
    console.error("Error in getEvents:", error);
    return [];
  }
}

export async function getEventById(id: string): Promise<EventData | null> {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
    return handleResponse(res);
  } catch (error) {
    console.error(`Error in getEventById for id ${id}:`, error);
    return null;
  }
}

export async function getSeatsByEvent(eventId: string): Promise<SeatData[]> {
  try {
    const res = await fetch(`${API_URL}/seats/by-event/${eventId}`, {
      cache: "no-store",
    });
    return handleResponse(res);
  } catch (error) {
    console.error(`Error in getSeatsByEvent for eventId ${eventId}:`, error);
    return [];
  }
}
