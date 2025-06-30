"use client";

import VideoUploadForm from "../../components/VideoUploadForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VideoUploadPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center mb-2">
                        Upload New Reel
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <VideoUploadForm />
                </CardContent>
            </Card>
        </div>
    );
}
