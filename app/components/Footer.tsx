"use client";

export default function Footer() {
    return (
        <footer className="footer p-6 bg-base-200 text-base-content">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p>
                    © {new Date().getFullYear()} Video with AI — All rights
                    reserved.
                </p>
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:underline">
                        Privacy
                    </a>
                    <a href="/terms" className="hover:underline">
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    );
}
