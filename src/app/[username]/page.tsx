"use client";

import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { app, onMessageDM } from "../database/firebase";
import { Message } from "../types";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

{
  /* <p>Esto es la página del usuario: {params.username}</p> */
}

export default function UserPage({ params }: { params: { username: string } }) {
  useEffect(() => {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        (process.env.NEXT_PUBLIC_APP_CHECK_KEY as string) || "",
      ),
      isTokenAutoRefreshEnabled: true,
    });
  }, []);

  useEffect(() => {
    const handler = onMessageDM({
      me: "aforcita",
      // user: "other",
      onMessage: (message: Message) => {
        console.log(message);
      },
    });

    return () => handler();
  }, []);

  return <Layout username={params.username}></Layout>;
}
