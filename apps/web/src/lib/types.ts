export interface EventData {
  id: string;
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  image: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeatData {
  id: string;
  row: number;
  number: number;
  price: number;
  status: "AVAILABLE" | "SOLD" | "LOCKED";
  eventId: string;
}
