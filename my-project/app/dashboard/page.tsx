'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth", { cache: "no-store" });
      if (res.status !== 200) {
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <form method="POST" action="/api/logout">
        <button type="submit" className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </form>
    </div>
  );
}
