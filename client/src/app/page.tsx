"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import BookDetails from "@/components/BookDetails";
import { RecentLoansTable } from "@/components/RecentLoansTable/recentLoansTable";
import { CategoryChart } from "@/components/CategoryChart";
import { MetricCard } from "@/components/MetricCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react"; 
import { api } from "@/lib/api"; 

interface DashboardResponse {
  totalLivros: number;
  emprestimosAtivos: number;
  emprestimosAtrasados: number;
  contagemPorCategoria: {
    categoria: string;
    quantidade: number;
  }[];
  ultimosEmprestimos: {
    id: string;
    nomeCliente: string;
    emailCliente: string;
    dataPrevistaDevolucao: string;
    createdAt: string;
    status: "EM_ANDAMENTO" | "ATRASADO" | "DEVOLVIDO"; 
    livro: {
      titulo: string; 
    };
  }[];
}

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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const response = await api.get<DashboardResponse>("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Carregando dados da dashboard...</p>
      </div>
    );
  }

  const formattedLoans = dashboardData.ultimosEmprestimos.map((loan) => ({
    id: loan.id,
    bookTitle: loan.livro.titulo, 
    clientName: loan.nomeCliente,
    rentalDate: loan.createdAt,
    returnDate: loan.dataPrevistaDevolucao,
    status: loan.status === "EM_ANDAMENTO" && new Date(loan.dataPrevistaDevolucao) < new Date() 
      ? ("ATRASADO" as const) 
      : (loan.status as "EM_ANDAMENTO" | "ATRASADO" | "DEVOLVIDO"),
  }));

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
            value={dashboardData.totalLivros.toLocaleString("pt-BR")} 
            icon={BookOpen} 
            iconColorClass="text-[#00C389]" 
            iconBgColorClass="bg-[#00C389]/10"
          />
          <MetricCard 
            title="Empréstimos Ativos" 
            value={dashboardData.emprestimosAtivos.toString()} 
            icon={Clock} 
            iconColorClass="text-[#00C389]" 
            iconBgColorClass="bg-[#00C389]/10"
          />
          <MetricCard 
            title="Livros Atrasados" 
            value={dashboardData.emprestimosAtrasados.toString()} 
            icon={AlertCircle} 
            iconColorClass="text-[#FF5B5B]" 
            iconBgColorClass="bg-[#FF5B5B]/10"
          />
        </div>

        <CategoryChart data={dashboardData.contagemPorCategoria} />

        <RecentLoansTable loans={formattedLoans} />
      </div>
    </main>
  );
}