"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { useNotification } from "../components/Notification";
import { toast } from "sonner";

export default function Home() {
    // const { showNotification } = useNotification();
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="flex flex-col items-center gap-8 py-10">
                    
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Welcome to{" "}
                        <span className="text-primary">Video with AI</span>
                    </h1>
                    <p className="text-muted-foreground text-center mb-4">
                        Create and share AI-powered videos with ease.
                    </p>
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() =>{
                            toast("Welcome to the app!", {
                                description: "Please login to get started.",
                            })
                            router.push("/register")
                        }}
                    >
                        Get Started
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
