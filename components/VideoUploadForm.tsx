"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FileUpload from "./FileUpload";

interface FormValues {
    title: string;
    description: string;
    videoUrl: string;
}

export default function VideoUploadForm() {
    const [uploading, setUploading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit = async (values: FormValues) => {
        setUploading(true);
        try {
            const res = await fetch("/api/videos/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("Failed to upload video");
            toast("Video uploaded successfully!");
            reset();
        } catch (err: any) {
            toast(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-lg shadow-lg">
                <CardContent className="py-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Upload a Video
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <Input
                                id="title"
                                placeholder="Enter video title"
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Title must be at least 2 characters",
                                    },
                                })}
                            />
                            {errors.title && (
                                <p className="text-destructive text-xs mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Describe your video"
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Description must be at least 5 characters",
                                    },
                                })}
                            />
                            {errors.description && (
                                <p className="text-destructive text-xs mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Video File
                            </label>
                            <FileUpload
                                fileType="video"
                                onSuccess={(res: any) => {
                                    setValue("videoUrl", res.url, {
                                        shouldValidate: true,
                                    });
                                    toast("Video uploaded!");
                                }}
                            />
                            {errors.videoUrl && (
                                <p className="text-destructive text-xs mt-1">
                                    {errors.videoUrl.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full mt-4"
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload Video"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
