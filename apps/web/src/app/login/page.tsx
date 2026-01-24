"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ead6]">
      <div className="w-full max-w-md space-y-6 rounded-none border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black text-center uppercase tracking-tight">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold uppercase text-xs">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-blue-500 placeholder:italic"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold uppercase text-xs">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-none border-2 border-black bg-yellow-400 text-black font-bold hover:bg-yellow-500 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
}
