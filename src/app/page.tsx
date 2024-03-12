"use client";
import { useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { useRouter } from "next/navigation";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { app } from "./database/firebase";

const avatar = createAvatar(adventurer, {
  seed: "Felix",
  flip: true,
  backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  // ... options
});

const svg = avatar.toDataUriSync();

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
    <main className="flex flex-col items-center p-24">
      <form onSubmit={submitName} className="flex flex-col text-center">
        <label>Escribe tu nombre</label>
        {/* <img src={svg} /> */}
        {/* <div dangerouslySetInnerHTML={{ __html: svg }}></div> */}
        <img src={svg} width={100} height={100}></img>
        <input name="username" className="mt-4 rounded-md p-2 text-black" />
        <button className="mt-8 rounded-md bg-white p-2 text-black hover:bg-slate-200">
          Enviar
        </button>
      </form>
    </main>
  );
}
