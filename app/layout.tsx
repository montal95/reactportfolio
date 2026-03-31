import type { Metadata } from "next";
import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import ThemeProvider from "@/app/components/ThemeProvider";
import Nav from "@/app/components/Nav";

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
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />
        <ThemeProvider>
          <Nav />
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
