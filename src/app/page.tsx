"use client";
import { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { UserType } from "./types";
import { useRouter } from "next/navigation";

export default function Home() {
  const { socket } = useSocket();
  const [isAdmin, setIsAdmin] = useState();
  const router = useRouter();

  const submitName = (event: any) => {
    const username = event.target.elements.username.value;
    event.preventDefault();
    socket.emit("mensaje-server", username);

    if (username === "afor") {
      router.push("/admin");
    } else {
      router.push(username);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={submitName} className="flex flex-col text-center">
        <label>Escribe tu nombre</label>
        <input name="username" className="mt-4 rounded-md p-2 text-black" />
        <button className="mt-8 rounded-md bg-white p-2 text-black hover:bg-slate-200">
          Enviar
        </button>
      </form>
    </main>
  );
}
