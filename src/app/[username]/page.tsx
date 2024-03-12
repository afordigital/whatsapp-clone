"use client";

import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { onMessageDM } from "../database/firebase";

{
  /* <p>Esto es la página del usuario: {params.username}</p> */
}

export default function UserPage({ params }: { params: { username: string } }) {
  // useEffect(() => {
  //   const handler = onMessageDM({
  //     me: "aforcita",
  //     user: "other",
  //     onMessage: (message: string) => {
  //       console.log(message);
  //     },
  //   });

  //   return () => handler();
  // }, []);

  return <Layout username={params.username}></Layout>;
}
