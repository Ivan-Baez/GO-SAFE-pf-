"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function AdminChat() {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [allMessages, setAllMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.emit("joinAdmin");

        socket.on("receiveUserMessage", (msg) => {
            setUsers((prev) => {
                const exists = prev.find((u) => u.id === msg.user.id);
                if (exists) return prev;
                return [...prev, msg.user];
            });

            setAllMessages((prev) => [...prev, msg]);

            if (!selectedUser) {
                setSelectedUser(msg.user);
            }

            if (selectedUser?.id === msg.user.id) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => socket.off("receiveUserMessage");
    }, [selectedUser]);

    useEffect(() => {
        if (!selectedUser) return;

        const filtered = allMessages.filter(
            (m) => m.user?.id === selectedUser.id
        );

        setMessages(filtered);
    }, [selectedUser]);

    const send = () => {
        if (!input || !selectedUser) return;

        const msg = { content: input, admin: true };

        setMessages((prev) => [...prev, msg]);

        socket.emit("adminMessage", {
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
                        className={`user-item ${selectedUser?.id === u.id ? "active" : ""
                            }`}
                        onClick={() => setSelectedUser(u)}
                    >
                        👤 {u.name}
                    </div>
                ))}
            </div>

            {/* CHAT */}
            <div className="admin-chat-box">

                <div className="admin-chat-header">
                    {selectedUser ? `Chat con ${selectedUser.name}` : "Selecciona usuario"}
                </div>

                <div className="admin-chat-messages">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={m.admin ? "msg-admin" : "msg-user"}
                        >
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