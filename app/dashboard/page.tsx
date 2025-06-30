"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import  {Video }  from "@imagekit/next";
interface VideoItem {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    ownerId: string;
    ownerEmail?: string;
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch all videos on mount
    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/video");
                const data = await res.json();
                setVideos(data);
            } catch {
                toast("Failed to fetch videos");
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    // Delete handler
    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/video/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setVideos((prev) => prev.filter((v) => v._id !== id));
            toast("Video deleted");
        } catch {
            toast("Failed to delete video");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">All Uploaded Videos</h1>
            {videos.length === 0 && !loading ? (
                <div className="text-center py-16 text-muted-foreground text-lg">
                    No videos found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <Card key={video._id} className="flex flex-col">
                            <CardHeader className="p-0">
                                <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
                                    <Video
                                        src={video.videoUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-2 pt-4">
                                <CardTitle className="text-lg">
                                    {video.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {video.description}
                                </CardDescription>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    Owner: {video.ownerEmail || video.ownerId}
                                    {session?.user?.id === video.ownerId && (
                                        <span className="ml-2 px-2 py-0.5 bg-primary text-xs text-white rounded">
                                            You
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                {session?.user?.id === video.ownerId ? (
                                    <Dialog
                                        open={deletingId === video._id}
                                        onOpenChange={(open) =>
                                            setDeletingId(
                                                open ? video._id : null
                                            )
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-full"
                                            >
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <h2 className="text-lg font-bold mb-2">
                                                Delete Video?
                                            </h2>
                                            <p>
                                                Are you sure you want to delete{" "}
                                                <span className="font-semibold">
                                                    {video.title}
                                                </span>
                                                ? This action cannot be undone.
                                            </p>
                                            <DialogFooter>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        setDeletingId(null)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDelete(video._id)
                                                    }
                                                >
                                                    Confirm Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <span className="text-muted-foreground text-xs w-full text-center">
                                        No actions
                                    </span>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
