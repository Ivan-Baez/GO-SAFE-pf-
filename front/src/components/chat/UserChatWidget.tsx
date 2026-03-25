"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function UserChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [notification, setNotification] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let id = localStorage.getItem("chatUserId");

        if (!id) {
            id = Math.random().toString();
            localStorage.setItem("chatUserId", id);
        }

        const newUser = { id, name: "Usuario" };

        setUser(newUser);

        socket.emit("joinUser", newUser);

        socket.on("receiveAdminMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);

            if (!open) {
                setNotification(true);
            }
        });

        return () => socket.off("receiveAdminMessage");
    }, [open]);

    if (!user) return null;

    const send = () => {
        if (!input) return;

        setMessages((prev) => [...prev, { content: input }]);

        socket.emit("userMessage", { content: input });

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