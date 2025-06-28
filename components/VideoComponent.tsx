import { Video } from "@imagekit/next";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VideoComponent({ video }: { video: IVideo }) {
    return (
        <Card className="hover:shadow-lg transition">
            <Link href={`/videos/${video._id}`}>
                <a>
                    <div
                        className="aspect-video overflow-hidden rounded-t-lg"
                        style={{ aspectRatio: "9/16" }}
                    >
                        <Video
                            src={video.videoUrl}
                            transformation={[
                                {
                                    height: "1920",
                                    width: "1080",
                                },
                            ]}
                            controls={video.controls}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </a>
            </Link>
            <CardHeader className="p-4">
                <CardTitle>{video.title} </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4 text-sm text-muted-foreground line-clamp-2">
                <div className="card-body p-4">
                    <Link
                        href={`/videos/${video._id}`}
                        className="hover:opacity-80 transition-opacity"
                    >
                        <h2 className="card-title text-lg">{video.title}</h2>
                    </Link>
                    {video.description}
                </div>
            </CardContent>
        </Card>
    );
}
