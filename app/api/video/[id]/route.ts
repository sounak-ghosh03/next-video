import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Video from "@/models/Video";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    // Get the session to identify the user
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const videoId = params.id;

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Check if the user is the owner
    if (video.ownerId.toString() !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the video
    await Video.findByIdAndDelete(videoId);

    return NextResponse.json(
        { message: "Video deleted successfully" },
        { status: 200 }
    );
}
