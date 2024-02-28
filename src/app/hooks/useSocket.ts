"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const useSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  return { socket };
};
