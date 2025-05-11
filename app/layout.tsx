import type { Metadata } from "next";
import "./globals.css";
// import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Solana-Watcher",
  description: "Track all whales and get notified for million-dollar opportunities on Solana",
};

export default function RootLayout({
  children,
  session,
}: { children: React.ReactNode; session: any }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <Providers session={session}>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
}
