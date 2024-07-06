import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stacks Stacking Signature Tool",
  description: "Get your stacking signature without running a signer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <div className="h-[50px] w-full"></div>
        <div className="flex flex-column text-white w-100 items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
