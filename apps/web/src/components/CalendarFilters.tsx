"use client";

import { useState } from "react";

export default function CalendarFilters() {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const days = [
    { day: "Пн", date: 23 },
    { day: "Вт", date: 24 },
    { day: "Ср", date: 25 },
    { day: "Чт", date: 26 },
    { day: "Пт", date: 27 },
    { day: "Сб", date: 28 },
    { day: "Вс", date: 29 },
  ];

  return (
    <div className="border border-black bg-white p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Январь</h3>
      <div className="flex space-x-2">
        {days.map((item) => (
          <button
            key={item.date}
            onClick={() => setSelectedDate(item.date)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-12 h-16 ${
              selectedDate === item.date
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="text-xs">{item.day}</span>
            <span className="font-bold text-lg">{item.date}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Эта неделя
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Выходные
        </button>
      </div>
    </div>
  );
}
