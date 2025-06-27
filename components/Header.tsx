"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
    const { data: session } = useSession();
    const { showNotification } = useNotification();

    const handleSignOut = async () => {
        try {
            await signOut();
            showNotification("Signed out successfully", "success");
        } catch {
            showNotification("Failed to sign out", "error");
        }
    };

    return (
        <header className="navbar bg-base-300 sticky top-0 z-40">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="btn btn-ghost text-xl font-bold flex items-center gap-2"
                    onClick={() =>
                        showNotification("Welcome to Video with AI", "info")
                    }
                >
                    <Home className="w-5 h-5" />
                    Video with AI
                </Link>

                <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost btn-circle">
                        <User className="w-5 h-5" />
                    </button>
                    <ul className="dropdown-content bg-base-100 shadow-lg rounded-box mt-4 w-52">
                        {session ? (
                            <>
                                <li className="px-4 py-2">
                                    <span className="text-sm opacity-70">
                                        {session.user?.email?.split("@")[0]}
                                    </span>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="px-4 py-2 hover:bg-base-200 block"
                                        onClick={() =>
                                            showNotification(
                                                "Welcome to Dashboard",
                                                "info"
                                            )
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/upload"
                                        className="px-4 py-2 hover:bg-base-200 block"
                                    >
                                        Upload Video
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 hover:bg-base-200 block"
                                    onClick={() =>
                                        showNotification(
                                            "Please sign in to continue",
                                            "info"
                                        )
                                    }
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}
