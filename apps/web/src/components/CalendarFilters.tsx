"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CalendarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentUrlDate = searchParams.get("date");
  const dateToParse = (currentUrlDate || new Date().toISOString()) as string;
  const initialDate = new Date(dateToParse).getDate();

  const [selectedDate, setSelectedDate] = useState<number>(initialDate); // <--- number, а не number | null

  const getNext7Days = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        dayOfWeek: date.toLocaleDateString("ru-RU", { weekday: "short" }),
        dateNum: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return days;
  };

  const days = getNext7Days();

  const handleDateClick = (dateNum: number, fullDate: string) => {
    setSelectedDate(dateNum);
    router.push(`/?date=${fullDate}`);
  };

  return (
    <div className="border border-black bg-white p-4 rounded-lg w-full">
      <h3 className="font-semibold mb-3 text-lg">
        {new Date().toLocaleDateString("ru-RU", { month: "long" })}
      </h3>
      {/* <--- Календарь-фильтры: ОТРЕДАКТИРОВАНО */}
      <div className="flex space-x-2 justify-between overflow-x-auto pb-2">
        {" "}
        {/* <--- Добавил overflow-x-auto */}
        {days.map((item) => (
          <button
            key={item.fullDate}
            onClick={() => handleDateClick(item.dateNum, item.fullDate)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors flex-shrink-0", // <--- flex-shrink-0, чтобы не сжимались
              "w-16 h-20", // <--- Увеличил размер
              selectedDate === item.dateNum
                ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" // <--- Добавил тень
                : "bg-gray-100 hover:bg-gray-200",
            )}
          >
            <span className="text-xs">{item.dayOfWeek.slice(0, 2)}</span>
            <span className="font-bold text-xl mt-1">{item.dateNum}</span>{" "}
            {/* <--- Увеличил размер даты */}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <Link
          href="/"
          className="w-full text-left p-2 hover:bg-gray-100 rounded block"
        >
          Вся афиша
        </Link>
        <Link
          href="/?category=WEEKEND"
          className="w-full text-left p-2 hover:bg-gray-100 rounded block"
        >
          Выходные
        </Link>
      </div>
    </div>
  );
}
