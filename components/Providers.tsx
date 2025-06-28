// app/components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={300}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                    <Header />
                    <main className="flex-1 container mx-auto py-8">
                        {children}
                    </main>
                    <Footer />
            </ImageKitProvider>
        </SessionProvider>
    );
}
