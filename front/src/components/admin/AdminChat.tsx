"use client";

import { Message, User } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function AdminChat() {
  const socketRef = useRef<Socket | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    );

    socketRef.current = socket;

    socket.emit("joinAdmin");

    const handleUserMessage = (msg: Message) => {
      if (!msg.user) return;

      const user = msg.user;

      setUsers((prev) => {
        const exists = prev.find((u) => u.id === user.id);
        if (exists) return prev;
        return [...prev, user];
      });

      setAllMessages((prev) => [...prev, msg]);

      setSelectedUser((prev) => prev ?? user);
    };

    socket.on("receiveUserMessage", handleUserMessage);

    return () => {
      socket.off("receiveUserMessage", handleUserMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const filtered = allMessages.filter((m) => m.user?.id === selectedUser.id);

    setMessages(filtered);
  }, [selectedUser, allMessages]);

  const send = () => {
    if (!input.trim() || !selectedUser || !socketRef.current) return;

    const msg: Message = {
      content: input,
      admin: true,
    };

    setMessages((prev) => [...prev, msg]);

    socketRef.current.emit("adminMessage", {
      userId: selectedUser.id,
      content: input,
    });

    setInput("");
  };

  return (
    <div className="admin-chat-container">
      {/* USERS */}
      <div className="admin-users">
        <h3>Usuarios</h3>

        {users.map((u) => (
          <div
            key={u.id}
            className={`user-item ${selectedUser?.id === u.id ? "active" : ""}`}
            onClick={() => setSelectedUser(u)}
          >
            👤 {u.name}
          </div>
        ))}
      </div>

      <div className="admin-chat-box">
        <div className="admin-chat-header">
          {selectedUser
            ? `Chat con ${selectedUser.name}`
            : "Selecciona usuario"}
        </div>

        <div className="admin-chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={m.admin ? "msg-admin" : "msg-user"}>
              {m.content}
            </div>
          ))}
        </div>

        <div className="admin-chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Responder..."
          />
          <button onClick={send}>Enviar</button>
        </div>
      </div>
    </div>
  );
}