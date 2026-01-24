import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0ead6] p-10">
      <div className="border-2 border-black bg-white p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase mb-4">Главная страница</h1>
        <p className="mb-6 font-bold">Вы успешно вошли в систему!</p>

        <Link
          href="/login"
          className="border-2 border-black bg-pink-400 px-4 py-2 font-bold hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Вернуться на логин
        </Link>
      </div>
    </main>
  );
}
