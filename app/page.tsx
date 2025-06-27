"use client";

import Image from "next/image";
import { useNotification } from "../components/Notification";

export default function Home() {
    const { showNotification } = useNotification();

    return (
        <div className="min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center gap-10 font-sans">
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />

            <button
                onClick={() =>
                    showNotification("Welcome to the app!", "success")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Show Welcome Toast
            </button>
        </div>
    );
}
