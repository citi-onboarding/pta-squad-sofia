"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import BookDetails from "@/components/BookDetails";

const mockData = {
  title: "O Senhor dos Anéis",
  author: "J.R.R. Tolkien",
  isbn: "978-8533613379",
  publisher: "Martins Fontes",
  category: "Romance",
  year: 2001,
  totalQuantity: 5,
  availableQuantity: 3,
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <BookDetails isOpen={isOpen} onClose={() => setIsOpen(false)} book={mockData} />
    </main>
  );
}