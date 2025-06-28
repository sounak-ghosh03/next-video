// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast("Signed out successfully");
        } catch {
            toast("Sign out failed");
        }
    };

    return (
        <header className="bg-base-300 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Videos
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-56">
                                <ul className="p-2">
                                    <li>
                                        <Link href="/upload">
                                            <NavigationMenuLink>
                                                Upload Video
                                            </NavigationMenuLink>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard">
                                            <NavigationMenuLink>
                                                Dashboard
                                            </NavigationMenuLink>
                                        </Link>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div>
                    {session ? (
                        <Button variant="outline" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    ) : (
                        <Button onClick={() => toast("Please login")}>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
