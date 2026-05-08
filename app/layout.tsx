import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracing Art — The Hidden Journey of Art",
  description: "Millions of records. Five centuries. The hidden journey of art.",
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
