import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";

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
    icon: "/brandPermaneo.svg",
    shortcut: "/brandPermaneo.svg",
    apple: "/brandPermaneo.svg",
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
      </body>
    </html>
  );
};

export default RootLayout;
