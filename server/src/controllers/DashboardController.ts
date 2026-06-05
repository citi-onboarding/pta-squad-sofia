import { Request, Response } from "express";
import prisma from "../database";

class DashboardController {
  async get(req: Request, res: Response) {
    try {
      const today = new Date();

      const totalBooks = await prisma.livro.aggregate({
        _sum: { quantidadeTotal: true }
      });

      const activeLoans = await prisma.emprestimo.count({
        where: { status: { in: ['EM_ANDAMENTO', 'ATRASADO'] } }
      });

      const overdueLoans = await prisma.emprestimo.count({
        where: {
          OR: [
            { status: 'ATRASADO' },
            { status: 'EM_ANDAMENTO', dataPrevistaDevolucao: { lt: today } }
          ]
        }
      });

      // FIX: sum the actual total quantity of books per category instead of counting rows
      const booksByCategory = await prisma.livro.groupBy({
        by: ['categoria'],
        _sum: { quantidadeTotal: true }
      });

      const latestLoans = await prisma.emprestimo.findMany({
        take: 4,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          livro: true
        }
      });

      const formattedLatestLoans = latestLoans.map((loan) => {
        const isOverdue = loan.status === 'EM_ANDAMENTO' && new Date(loan.dataPrevistaDevolucao) < today;
        return {
          ...loan,
          status: isOverdue ? 'ATRASADO' : loan.status 
        };
      });

      return res.status(200).json({
        totalLivros: totalBooks._sum.quantidadeTotal || 0,
        emprestimosAtivos: activeLoans, 
        emprestimosAtrasados: overdueLoans, 
        contagemPorCategoria: booksByCategory.map(item => ({
          categoria: item.categoria,
          quantidade: item._sum.quantidadeTotal || 0 
        })),
        ultimosEmprestimos: formattedLatestLoans
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error while loading dashboard data." });
    }
  }
}

export default new DashboardController();