"use client";

import { useState } from "react";
import type { SeatData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SeatMapProps {
  seats: SeatData[];
}

export default function SeatMap({ seats }: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);

  const rows = seats.reduce<Record<number, SeatData[]>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }

    acc[seat.row]!.push(seat);
    return acc;
  }, {});

  const handleSeatClick = (seat: SeatData) => {
    if (seat.status === "SOLD") {
      return;
    }

    if (selectedSeat && selectedSeat.id === seat.id) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seat);
    }
  };

  return (
    <div className="border border-black p-6 bg-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-bold text-2xl text-center mb-6">Выберите место</h2>

      <div className="w-3/4 h-8 mx-auto bg-gray-300 border-2 border-black mb-10 text-center font-bold text-gray-600">
        СЦЕНА
      </div>

      <div className="space-y-3">
        {Object.entries(rows).map(([rowNum, seatsInRow]) => (
          <div
            key={rowNum}
            className="flex items-center justify-center space-x-2"
          >
            <span className="font-bold w-8 text-right">{rowNum}</span>
            {seatsInRow.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "SOLD"}
                className={cn(
                  "w-8 h-8 rounded-md font-bold text-xs transition-transform",
                  {
                    "bg-gray-300 cursor-not-allowed": seat.status === "SOLD",
                    "bg-yellow-400 hover:bg-yellow-500":
                      seat.status === "AVAILABLE",
                    "ring-2 ring-blue-500 ring-offset-2":
                      selectedSeat?.id === seat.id,
                  },
                )}
              >
                {seat.number}
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="mt-8 pt-4 border-t border-black text-center">
          <p className="font-bold">Выбрано:</p>
          <p>
            Ряд: <span className="font-black">{selectedSeat.row}</span>, Место:{" "}
            <span className="font-black">{selectedSeat.number}</span>
          </p>
          <p>
            Цена: <span className="font-black">{selectedSeat.price} ₽</span>
          </p>
          <Button className="mt-4 rounded-none border-2 border-black bg-green-400 text-black font-bold hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Купить
          </Button>
        </div>
      )}
    </div>
  );
}
