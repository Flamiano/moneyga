import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneyGa",
  description:
    "A secure financial discipline tool designed for Android users. Track your Peso expenses with ease.",
  icons: {
    icon: [
      { url: "/img/logo.png" }, // Standard favicon
      { url: "/img/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/img/logo.png",
    apple: "/img/logo.png", // For iOS/Android home screen shortcuts
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This link helps mobile browsers treat it as a circular icon icon */}
        <link rel="mask-icon" href="/img/logo.png" color="#10b981" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
