"use client";

import { Message, User } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function UserChatWidget() {
  const socketRef = useRef<Socket | null>(null);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 🔌 conexión socket (una sola vez)
  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    );

    socketRef.current = socket;

    let id = localStorage.getItem("chatUserId");

    if (!id) {
      id = Math.random().toString();
      localStorage.setItem("chatUserId", id);
    }

    const newUser = { id, name: "Usuario" };

    setUser(newUser);

    socket.emit("joinUser", newUser);

    const handleAdminMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);

      if (!open) {
        setNotification(true);
      }
    };

    socket.on("receiveAdminMessage", handleAdminMessage);

    return () => {
      socket.off("receiveAdminMessage", handleAdminMessage);
      socket.disconnect();
    };
  }, []);

  if (!user) return null;

  const send = () => {
    if (!input.trim() || !socketRef.current) return;

    setMessages((prev) => [...prev, { content: input }]);

    socketRef.current.emit("userMessage", {
      content: input,
    });

    setInput("");
  };

  return (
    <>
      <div
        className="chat-float-btn"
        onClick={() => {
          setOpen(!open);
          setNotification(false);
        }}
      >
        💬
        {notification && <span className="chat-dot"></span>}
      </div>

      {open && (
        <div className="chat-container">
          <div className="chat-header">Soporte</div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={m.admin ? "msg-other" : "msg-user"}>
                {m.content}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe..."
            />
            <button onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
