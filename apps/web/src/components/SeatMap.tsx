"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { SeatData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SeatMapProps {
  seats: SeatData[];
  eventName: string;
  eventId: string;
}

export default function SeatMap({ seats, eventName, eventId }: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const rows = seats.reduce<Record<number, SeatData[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row]!.push(seat);
    return acc;
  }, {});

  const handleSeatClick = (seat: SeatData) => {
    if (seat.status === "SOLD") return;
    setSelectedSeat((prev) => (prev?.id === seat.id ? null : seat));
  };

  const handleBuyTicket = async () => {
    if (!selectedSeat) return;

    setIsLoading(true);
    try {
      const bookingRes = await axios.post(
        "http://localhost:4000/bookings",
        { seatId: selectedSeat.id },
        { withCredentials: true },
      );
      const booking = bookingRes.data;

      const paymentRes = await axios.post(
        "http://localhost:4000/payments",
        {
          amount: selectedSeat.price,
          description: `Билет на ${eventName}, Ряд ${selectedSeat.row}, Место ${selectedSeat.number}`,
          metadata: { bookingId: booking.id },
        },
        { withCredentials: true },
      );

      const payment = paymentRes.data;

      if (payment.confirmation?.confirmation_url) {
        window.location.href = payment.confirmation.confirmation_url;
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push(`/login?redirect=/events/${eventId}`);
      } else {
        console.error("Ошибка при покупке:", error);
        alert("Произошла ошибка. Попробуйте снова.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const firstRow = Object.values(rows)[0];
  const numColumns = firstRow?.length || 10;
  const gridStyle = {
    gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
  };

  return (
    <div className="border-4 border-black p-6 md:p-10 bg-[#FAF9F6] rounded-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto">
      <h2 className="font-black text-3xl md:text-4xl text-center mb-8 uppercase tracking-tighter">
        Выбор места
      </h2>

      <div className="relative mb-16">
        <div className="w-full h-4 bg-black rounded-full blur-md opacity-20 absolute -bottom-2"></div>
        <div className="w-full h-12 bg-black text-white rounded-lg flex items-center justify-center font-black tracking-[0.3em] text-lg shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
          СЦЕНА
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-10 text-sm font-bold">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white border-2 border-black rounded-md"></div>
          <span>Свободно</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black opacity-20 border-2 border-black rounded-md"></div>
          <span>Занято</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-yellow-400 border-2 border-black rounded-md"></div>
          <span>Выбрано</span>
        </div>
      </div>

      <div className="space-y-4 overflow-x-auto pb-6 px-2 custom-scrollbar">
        {Object.entries(rows).map(([rowNum, seatsInRow]) => (
          <div
            key={rowNum}
            className="flex items-center min-w-max justify-center"
          >
            <div className="font-black w-12 text-right pr-4 text-black/30 text-lg tabular-nums">
              {rowNum}
            </div>
            <div className="grid gap-3" style={gridStyle}>
              {seatsInRow.map((seat) => {
                const isSelected = selectedSeat?.id === seat.id;
                const isSold = seat.status === "SOLD";
                return (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isSold}
                    className={cn(
                      "w-10 h-11 md:w-12 md:h-14 rounded-t-xl rounded-b-md font-black text-xs md:text-sm transition-all duration-200 relative tabular-nums",
                      "border-2 border-black",
                      !isSold &&
                        !isSelected &&
                        "bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                      isSold && "bg-black cursor-not-allowed opacity-20",
                      isSelected &&
                        "bg-yellow-400 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -bottom-1 left-1 right-1 h-1 bg-black/10 rounded-full",
                        isSelected && "bg-black/20",
                      )}
                    ></div>
                    {seat.number}
                  </button>
                );
              })}
            </div>
            <div className="font-black w-12 text-left pl-4 text-black/30 text-lg tabular-nums">
              {rowNum}
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-10 overflow-hidden transition-all duration-500 max-h-0",
          selectedSeat && "max-h-[400px]",
        )}
      >
        <div className="p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FAF9F6] border-4 border-black rounded-full"></div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FAF9F6] border-4 border-black rounded-full"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <p className="text-xs font-black uppercase text-gray-400 mb-1">
                Ваш выбор
              </p>
              <div className="flex gap-4 items-baseline">
                <span className="text-3xl md:text-4xl font-black italic uppercase">
                  Ряд {selectedSeat?.row}
                </span>
                <span className="text-3xl md:text-4xl font-black italic text-yellow-500 uppercase">
                  Место {selectedSeat?.number}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end w-full md:w-auto">
              <span className="text-3xl font-black mb-2">
                {selectedSeat?.price} ₽
              </span>
              <Button
                onClick={handleBuyTicket}
                disabled={isLoading}
                className="w-full md:w-auto h-14 px-10 rounded-none border-4 border-black bg-[#ff5c00] text-white font-black text-xl hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                {isLoading ? "ОБРАБОТКА..." : "КУПИТЬ БИЛЕТ"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
