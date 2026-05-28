import type { Metadata } from "next";
import { Header } from "@/components/Header";


import "styles/globals.css";

export const metadata: Metadata = {
  title: "Biblioteca Escolar",
  description: "Uma biblioteca escolar",
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
