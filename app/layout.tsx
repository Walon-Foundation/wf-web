import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Walon Foundation",
  description:
    "Walon Foundation is the public home for useful open-source software, engineering standards, and client-facing product work by Mohamed Lamin Walon Jalloh.",
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
