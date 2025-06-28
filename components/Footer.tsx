// app/components/Footer.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
    return (
        <Card className="mt-8 bg-base-200">
            <CardContent className="flex justify-between items-center">
                <p>
                    © {new Date().getFullYear()} Video with AI — All rights
                    reserved.
                </p>
                <div className="space-x-4">
                    <a href="/privacy" className="text-primary hover:underline">
                        Privacy
                    </a>
                    <a href="/terms" className="text-primary hover:underline">
                        Terms
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
