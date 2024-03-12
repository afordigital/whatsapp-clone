"use client";

import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { app, onMessageDM } from "../database/firebase";
import { Message } from "../types";
import { groupBy } from "../utils/groupBy";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

export default function AdminPage({
  params,
}: {
  params: { username: string };
}) {
  const [messages, setMessages] = useState<Message[]>([]);

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
