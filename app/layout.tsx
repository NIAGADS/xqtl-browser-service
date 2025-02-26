import type { Metadata } from "next";
import { Providers } from "./provider";

import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
    title: "ADSP FunGen-xQTL Browser",
    description: "https://xqtl.niagads.org",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <header className="bg-blue-500 p-4"><Navigation></Navigation></header>
                        <div className="flex flex-row flex-grow">
                            <aside className="w-64 p-4 bg-gray-200 hidden sm:block">
                                Sidebar
                            </aside>
                            <main className="flex-grow p-4">{children}</main>
                        </div>
                        <footer className="bg-gray-300 p-4">Footer</footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
