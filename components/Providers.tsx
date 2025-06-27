// app/components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
import { NotificationProvider } from "./Notification";
import Header from "./Header";
import Footer from "./Footer";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={300}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                <NotificationProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </NotificationProvider>
            </ImageKitProvider>
        </SessionProvider>
    );
}
