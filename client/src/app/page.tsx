"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import BookDetails from "@/components/BookDetails";
import { RecentLoansTable } from "@/components/RecentLoansTable/recentLoansTable";
import { CategoryChart } from "@/components/CategoryChart";
import { MetricCard } from "@/components/MetricCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react"; 

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

const mockCategoryData = [
  { category: "Romance", quantity: 245 },
  { category: "Tecnologia", quantity: 318 },
  { category: "História", quantity: 190 },
  { category: "Ciências", quantity: 265 },
  { category: "Infantil", quantity: 230 },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full">
        <Header />
      </div>

      <BookDetails isOpen={isOpen} onClose={() => setIsOpen(false)} book={mockBookData} />

      <div className="w-full max-w-[1000px] mt-8 px-4 flex flex-col gap-8 mb-12">
        
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400">Visão geral da biblioteca</p>
        </div>

        <div className="flex flex-wrap gap-4 w-full">
          <MetricCard 
            title="Total de Livros" 
            value="1.245" 
            icon={BookOpen} 
            iconColorClass="text-[#00C389]" 
            iconBgColorClass="bg-[#00C389]/10"
          />
          <MetricCard 
            title="Empréstimos Ativos" 
            value="87" 
            icon={Clock} 
            iconColorClass="text-[#00C389]" 
            iconBgColorClass="bg-[#00C389]/10"
          />
          <MetricCard 
            title="Livros Atrasados" 
            value="12" 
            icon={AlertCircle} 
            iconColorClass="text-[#FF5B5B]" 
            iconBgColorClass="bg-[#FF5B5B]/10"
          />
        </div>

        <CategoryChart data={mockCategoryData} />

        <RecentLoansTable loans={mockLoans} />
      </div>
    </main>
  );
}