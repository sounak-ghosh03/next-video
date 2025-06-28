"use client";
import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
    videos: IVideo[];
}

export default function VideoFeed({ videos }: { videos: IVideo[] }) {
    if (videos.length === 0) {
        return (
            <p className="text-center py-12 text-muted-foreground">
                No videos found
            </p>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoComponent key={video._id?.toString()} video={video} />
            ))}
        </div>
    );
}
