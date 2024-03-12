"use client";

import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { app, onMessageDM } from "../database/firebase";
import { Message } from "../types";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { groupBy } from "../utils/groupBy";

export default function AdminPage({
  params,
}: {
  params: { username: string };
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   initializeAppCheck(app, {
  //     provider: new ReCaptchaV3Provider(
  //       (process.env.NEXT_PUBLIC_APP_CHECK_KEY as string) || "",
  //     ),
  //     isTokenAutoRefreshEnabled: true,
  //   });
  // }, []);

  //@ts-ignore
  // const messagesGroupedByUser = Object.groupBy(
  //   messages,
  //   (message: Message) => message.to,
  // );

  const messagesGroupedByUser = groupBy(
    messages,
    (message: Message) => message.to,
  );

  console.log(messagesGroupedByUser);

  useEffect(() => {
    const aux = [] as Message[];

    const handler = onMessageDM({
      me: "aforcita",
      onMessage: (message) => {
        setMessages((messages) => [...messages, message]);
      },
    });

    return () => handler();
  }, []);

  console.log(messages);

  return <Layout username={params.username} messages={messages}></Layout>;
}
