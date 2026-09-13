import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobs Overseas | Find International Work Opportunities",
  description:
    "Browse verified international job opportunities in healthcare, hospitality, logistics, and construction across the UK, Ireland, Poland, and Canada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
