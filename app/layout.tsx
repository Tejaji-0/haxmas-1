import type { Metadata } from "next";
import { Ballet, Delius } from "next/font/google";
import "./globals.css";

const ballet = Ballet({
  variable: "--font-ballet",
  subsets: ["latin"],
  weight: "400",
});

const delius = Delius({
  variable: "--font-delius",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Christmas Cookie Clicker",
  description: "A jolly Christmas-themed clicker game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ballet.variable} ${delius.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
