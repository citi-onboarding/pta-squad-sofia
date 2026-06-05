"use client";

import { useState, useEffect } from "react";
import { RecentLoansTable } from "@/components/RecentLoansTable/recentLoansTable";
import { CategoryChart } from "@/components/CategoryChart";
import { MetricCard } from "@/components/MetricCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import PageContainer from "@/components/PageContainer";
import { categoryMap } from "@/utils/dictionaries";

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

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [dashboardData, setDashboardData] =
    useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        const response = await api.get<DashboardResponse>("/dashboard");

        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading dashboard data...</p>
      </div>
    );
  }

  // maps properties to match the required format for RecentLoansTable
  const formattedLoans = dashboardData.ultimosEmprestimos.map((loan) => ({
    id: loan.id,
    bookTitle: loan.livro.titulo,
    clientName: loan.nomeCliente,
    rentalDate: loan.createdAt,
    returnDate: loan.dataPrevistaDevolucao,
    status:
      loan.status === "EM_ANDAMENTO" &&
      new Date(loan.dataPrevistaDevolucao) < new Date()
        ? ("ATRASADO" as const)
        : (loan.status as "EM_ANDAMENTO" | "ATRASADO" | "DEVOLVIDO"),
  }));

  const formattedChartData = dashboardData.contagemPorCategoria.map((item) => ({
    ...item,
    categoria: categoryMap[item.categoria.toUpperCase()] || item.categoria,
  }));

  const formattedChartData = dashboardData.contagemPorCategoria.map((item) => ({
    category: item.categoria,
    quantity: item.quantidade,
  }));

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[1000px] mt-8 px-4 flex flex-col gap-8 mb-12">
        
        {/* Title Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400">Library overview</p>
        </div>

        {/* Metrics Section */}
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

        {/* Chart Component receiving translated and refactored keys */}
        <CategoryChart data={formattedChartData} />

        {/* Recent Loans Component */}
        <RecentLoansTable loans={formattedLoans} />
      </div>
    </main>
  );
}