import type { Metadata } from "next";
import { Providers } from "./provider";

import "./globals.css";

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
                {children}
                </Providers>
                </body>
        </html>
    );
}
