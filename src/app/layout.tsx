import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IndustrialBackground from "@/components/IndustrialBackground";
import FloatingDock from "@/components/FloatingDock";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cedrick | Portfolio",
  description: "Web developer and data scientist based in Manila.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative selection:bg-white/10 selection:text-white">
        <IndustrialBackground />
        {children}
        <FloatingDock />
      </body>
    </html>
  );
}
