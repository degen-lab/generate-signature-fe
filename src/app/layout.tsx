import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import { NetworkProvider } from "./contexts/NetworkContext";
import { ThemeProvider } from "next-themes";

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
      <NetworkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
          >
            <Navbar></Navbar>
            <div className="h-[100px] w-full"></div>
            <div className="flex flex-col text-white w-full items-center justify-center">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </NetworkProvider>
    </html>
  );
}
