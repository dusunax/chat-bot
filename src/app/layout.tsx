import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "LLM Chatbot for AI-powered conversations",
};

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comicNeue.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow font-[family-name:var(--font-comic-neue)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
