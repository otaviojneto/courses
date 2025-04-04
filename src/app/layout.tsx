import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/Ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teste Permaneo",
  icons: {
    icon: "/icons/brandPermaneo.svg",
    shortcut: "/icons/brandPermaneo.svg",
    apple: "/icons/brandPermaneo.svg",
  },
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="pb-20">
          <Nav />
        </header>
        <div className="container">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
