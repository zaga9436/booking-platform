"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import type { BookingData } from "@/lib/types";

export default function ProfilePage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:4000/bookings/my", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push("/login");
        } else {
          console.error("Ошибка загрузки билетов:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true },
      );
      router.push("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загрузка профиля...
      </div>
    );
  }

  return (
    <div className="bg-[#f0ead6] min-h-screen">
      <main className="max-w-[1200px] mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase">Личный кабинет</h1>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Выйти
          </Button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2">
            Мои билеты
          </h2>
          {bookings.length > 0 ? (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col md:flex-row bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="p-6 flex-grow">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      {booking.seat.event.location}
                    </p>
                    <h3 className="text-2xl font-black uppercase my-2">
                      {booking.seat.event.name}
                    </h3>
                    <p className="font-semibold">
                      {new Date(booking.seat.event.date).toLocaleString(
                        "ru-RU",
                      )}
                    </p>
                  </div>
                  <div className="bg-yellow-400 p-6 border-t-4 md:border-t-0 md:border-l-4 border-dashed border-black flex flex-col items-center justify-center text-center w-full md:w-64">
                    <p className="font-bold">
                      Ряд{" "}
                      <span className="text-3xl font-black">
                        {booking.seat.row}
                      </span>
                    </p>
                    <p className="font-bold">
                      Место{" "}
                      <span className="text-3xl font-black">
                        {booking.seat.number}
                      </span>
                    </p>
                    <p className="mt-2 text-sm">
                      Статус:{" "}
                      <span className="font-bold">{booking.status}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>У вас пока нет билетов.</p>
          )}
        </div>
      </main>
    </div>
  );
}
