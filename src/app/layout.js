import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { img } from "framer-motion/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Rawh | Portfolio",
  description: "Welcome to my portfolio. Explore my projects and learn more about my work as a student.",
  keywords: "portfolio, developer, next.js, react, web development",
  authors: [{ name: "Neang Sokdara" }],
  openGraph: {
    title: "Rawh | Portfolio",
    description: "Sokdara's Portfolio",
    type: "website",
  },
};

export default function ({ children }) {
  return (
   <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
