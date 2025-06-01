import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";

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
      <ThemeProvider>
        <body
          className={`${comicNeue.variable} antialiased dark:bg-black dark:text-white transition-colors duration-200`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow font-[family-name:var(--font-comic-neue)]">
              {children}
            </main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
