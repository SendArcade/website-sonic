import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";

export const metadata: Metadata = {
  title: "Send Arcade",
  description: "Send Arcade",
  openGraph: {
    title: "Send Arcade",
    description: "Gamifying Blinks",
    url: "https://sendarcade.fun",
    siteName: "Send Arcade",
    images: [
      {
        url: "https://sendarcade.fun/banner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Send Arcade",
    description: "Gamifying Blinks",
    site: "@send_arcade",
    images: ["https://sendarcade.fun/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const myFont = localFont({
  src: "./ppneuebit-bold.otf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {" "}
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
