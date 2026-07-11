import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMMAND CENTER",
  description: "Advanced Cyber Defense Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg" />
        <div className="scanline" />
        <div className="scan-bar" />
        {children}
      </body>
    </html>
  );
}
