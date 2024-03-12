"use client";

import { ChatHistory } from "./ChatHistory";

import { sendMessage } from "../database/firebase";
import { Message } from "../types";

type LayoutProps = {
  username: string;
  messages?: Message[];
};

export const Layout = ({ username, messages }: LayoutProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const message = event.target["message-input"].value;

    sendMessage({
      from: "aforcita",
      to: "zibran",
      text: message,
    });
  };

  return (
    <div className="relative flex h-screen max-h-screen flex-col">
      <header className="flex h-[96px] items-center bg-[#F0F2F5] px-6">
        <img
          src="./imgs/hqdefault.jpg"
          width="70px"
          height="70px"
          className="aspect-square rounded-full object-cover object-center"
        />
      </header>
      <div className="relative flex h-full flex-1">
        <ChatHistory></ChatHistory>
        <div className="flex w-full max-w-full flex-col bg-[url('/imgs/bg.png')]">
          <div className="mb-4 ml-32 flex h-full flex-1 flex-col items-end justify-end gap-y-2 overflow-y-auto">
            {messages?.map((message) => {
              return (
                <p
                  key={message.date.nanoseconds}
                  className="break-all rounded-md bg-[#D9FDD3] px-4 py-2 text-black"
                >
                  {message.text}
                </p>
              );
            })}
          </div>

          <div className="h-fit bg-[#F0F2F5] p-4 text-black">
            <form onSubmit={handleSubmit} className="flex gap-x-4">
              <input name="message-input" className="w-full rounded-md py-2" />
              <button className="rounded-md bg-blue-500 px-4 text-white hover:bg-blue-600">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
