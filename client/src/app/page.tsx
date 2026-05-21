"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import BookDetails from "@/components/BookDetails";
import { RecentLoansTable } from "@/components/RecentLoansTable/recentLoansTable";

const mockBookData = {
  title: "O Senhor dos Anéis",
  author: "J.R.R. Tolkien",
  isbn: "978-8533613379",
  publisher: "Martins Fontes",
  category: "Romance",
  year: 2001,
  totalQuantity: 5,
  availableQuantity: 3,
};

const mockLoans = [
  {
    id: "1",
    bookTitle: "Clean Code",
    clientName: "João Silva",
    rentalDate: "2026-04-20T00:00:00.000Z",
    returnDate: "2026-04-27T00:00:00.000Z",
    status: "EM_ANDAMENTO" as const,
  },
  {
    id: "2",
    bookTitle: "O Pequeno Príncipe",
    clientName: "Maria Santos",
    rentalDate: "2026-04-18T00:00:00.000Z",
    returnDate: "2026-04-25T00:00:00.000Z",
    status: "ATRASADO" as const,
  },
  {
    id: "3",
    bookTitle: "Dom Casmurro",
    clientName: "Pedro Costa",
    rentalDate: "2026-04-15T00:00:00.000Z",
    returnDate: "2026-04-22T00:00:00.000Z",
    status: "DEVOLVIDO" as const,
  },
  {
    id: "4",
    bookTitle: "JavaScript: The Good Parts",
    clientName: "Ana Oliveira",
    rentalDate: "2026-04-22T00:00:00.000Z",
    returnDate: "2026-04-29T00:00:00.000Z",
    status: "EM_ANDAMENTO" as const,
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full">
        <Header />
      </div>

      <BookDetails isOpen={isOpen} onClose={() => setIsOpen(false)} book={mockBookData} />

      <div className="w-full max-w-[1000px] mt-12 px-4 mb-12">
        <RecentLoansTable loans={mockLoans} />
      </div>
    </main>
  );
}