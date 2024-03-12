import { Timestamp } from "firebase/firestore";

export type UserType = "Admin" | "User";

export type User = {
  id: number;
  name: string;
};

export type Message = {
  from: string;
  to: string;
  text: string;
  date: Timestamp;
};
