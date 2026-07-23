import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { Toaster } from 'react-hot-toast';
import { BanCheck } from "@/components/banCheck";
import ConsentGate from "@/components/consentGate";

const geistSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feedbase",
  description: "Make your feedback!",
  openGraph: {
    title: 'Feedbase',
    description: 'Open source feedback management platform for product teams.',
    images: [
      {
        url: `${process.env.BETTER_AUTH_URL}/og.png`,
        width: 1291,
        height: 721,
        alt: 'Feedbase',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsentGate />
        <BanCheck />
        <Navbar />
        {children}
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "12px",
          }
        }} />
        <Footer />
      </body>
    </html>
  );
}