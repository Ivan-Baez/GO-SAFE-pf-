"use client";

import { usePathname } from "next/navigation";
import UserChatWidget from "./UserChatWidget";

export default function ChatWrapper() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return <UserChatWidget />;
}