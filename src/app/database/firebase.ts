"use client";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config.json";
import {
  Timestamp,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  or,
} from "firebase/firestore";
import { Message } from "../types";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { useEffect } from "react";

const COLLECTION = "whatsapp";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(
    (process.env.NEXT_PUBLIC_APP_CHECK_KEY as string) || "",
  ),
  isTokenAutoRefreshEnabled: true,
});

/**
 * onSnapshot message DM, from "me" or from "user"
 *  Message sent from me to user
 *  Message sent from user to me
 */

interface onMessageProps {
  me: string;
  onMessage: (message: Message) => void;
}

export const onMessageDM = ({
  me,
  onMessage = (message) => {},
}: onMessageProps) => {
  const q = query(
    collection(db, COLLECTION),
    or(where("from", "==", me), where("to", "==", me)),
    orderBy("date", "asc"),
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        onMessage(change.doc.data() as any);
      }
    });
  });

  return unsubscribe;
};

/**
 * Add document to collection "whatsapp"
 *
 * from: string - persona que envia mensaje
 * to: string - persona que recibe el mensaje
 * text: string - contenido del mensaje
 * date: fecha de envÃ­o del mensaje
 */

interface sendMessageProps {
  from: string;
  to: string;
  text: string;
}

export const sendMessage = async ({ from, to, text }: sendMessageProps) => {
  const col = collection(db, COLLECTION);
  return await addDoc(col, {
    from,
    to,
    text,
    date: Timestamp.fromDate(new Date()),
  });
};
