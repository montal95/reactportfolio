import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sam Montalvo Jr — Full-Stack Engineer",
  description: "Full-stack software engineer based in Chicago.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
