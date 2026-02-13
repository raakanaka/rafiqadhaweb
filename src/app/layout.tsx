import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafiq Al Hafizh Adha - Web Developer Portfolio",
  description: "Passionate web developer from Indonesia. I build modern, responsive, and beautiful web applications with React, Next.js, and TypeScript.",
  keywords: ["Rafiq Al Hafizh Adha", "Rafiq", "Web Developer", "Next.js", "React", "TypeScript", "Portfolio", "Indonesia"],
  authors: [{ name: "Rafiq Al Hafizh Adha" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Rafiq Al Hafizh Adha - Web Developer Portfolio",
    description: "Passionate web developer from Indonesia building modern web applications",
    url: "https://rafiq.biz.id",
    siteName: "Rafiq Al Hafizh Adha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafiq Al Hafizh Adha - Web Developer Portfolio",
    description: "Passionate web developer from Indonesia building modern web applications",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
