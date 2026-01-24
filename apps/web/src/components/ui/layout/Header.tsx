import Link from "next/link";
import { Button } from "../button";

export default function Header() {
  return (
    <header className="border-b border-black bg-white">
      <div className="max-w-[1200px] mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">АФИША УФЫ</h1>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium hover:underline">
            Личный кабинет
          </Link>

          <div className="border border-black p-2 rounded-full cursor-pointer">
            🔍
          </div>
          <div className="border border-black p-2 rounded-full cursor-pointer">
            ☰
          </div>
        </div>
      </div>
      <nav className="bg-yellow-400 p-2">
        <ul className="max-w-[1200px] mx-auto flex space-x-6 text-sm font-semibold">
          <li>
            <Link href="/?category=CONCERT" className="hover:underline">
              КОНЦЕРТ
            </Link>
          </li>
          <li>
            <Link href="/?category=THEATRE" className="hover:underline">
              ТЕАТР
            </Link>
          </li>
          <li>
            <Link href="/?category=KIDS" className="hover:underline">
              ДЕТЯМ
            </Link>
          </li>
          <li>
            <Link href="/?category=OTHER" className="hover:underline">
              ЕЩЁ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
