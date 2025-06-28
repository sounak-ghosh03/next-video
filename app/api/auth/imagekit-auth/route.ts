import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.NEXT_PRIVATE_KEY!,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            
        });

        return Response.json({
            authenticationParameters,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Authentication for imagekit failed",
            },
            {
                status: 500,
            }
        );
    }
}
