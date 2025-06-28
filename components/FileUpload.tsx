"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}

export default function FileUpload({
    onSuccess,
    onProgress,
    fileType,
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    //optional validation
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Only video files are allowed");
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100MB");
            return false;
        }
        setError(null);
        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;

        setUploading(true);
        setError(null);

        try {
            // const authRes = await fetch("/api/auth/imagekit-auth");
            // const auth = await authRes.json();

            // const res = await upload({
            //     file,
            //     fileName: file.name,
            //     publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            //     signature: auth.signature,
            //     expire: auth.expire,
            //     token: auth.token,
            // const { authenticationParameters, publicKey } =
            //     await authRes.json();

            // const { signature, expire, token } = authenticationParameters;

            // perform upload
            // const res = await upload({
            //     file,
            //     fileName: file.name,
            //     publicKey,
            //     signature,
            //     expire,
            //     token,
// 1) Fetch once...
      const authRes = await fetch("/api/auth/imagekit-auth");

      // 2) Bail early if non-2xx
      if (!authRes.ok) {
        const errBody = await authRes.json().catch(() => ({}));
        throw new Error(
          errBody.error || `ImageKit auth failed: ${authRes.status}`
        );
      }

      // 3) Parse JSON once and destructure
      const data = await authRes.json();
      const { authenticationParameters, publicKey } = data as {
        authenticationParameters?: {
          signature: string;
          expire: number;
          token: string;
        };
        publicKey?: string;
      };

      // 4) Guard against missing fields
      if (
        !authenticationParameters ||
        !authenticationParameters.signature ||
        !authenticationParameters.expire ||
        !authenticationParameters.token ||
        !publicKey
      ) {
        throw new Error("Invalid auth response from server");
      }

      // 5) Perform the upload
      const { signature, expire, token } = authenticationParameters;
      const res = await upload({
        file,
        fileName: file.name,
        publicKey,
        signature,
        expire,
        token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        setProgress(Math.round(percent));
                    }
                },
            });
            onSuccess(res);
            toast("File uploaded successfully");
        } catch (error) {
            setError("File upload failed");
            console.error("Upload failed", error);
            toast.error("File upload failed");
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="space-y-2">
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                id="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <label htmlFor="file">
                <Button asChild>
                    <span>Choose {fileType}</span>
                </Button>
            </label>
            {progress > 0 && <Progress value={progress} className="w-full" />}
        </div>
    );
}
