import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navi from "./components/Navi";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMDB",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navi />
        {children}
      </body>
    </html>
  );
}
