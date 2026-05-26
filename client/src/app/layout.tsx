import type { Metadata } from "next";
import { Header } from "@/components/Header";


import "styles/globals.css";

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "A simple boilerplate for next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
