import { Request, Response } from "express";
import prisma from "../database";

class DashboardController {
  async get(req: Request, res: Response) {
    try {
      const hoje = new Date();

      const totalLivros = await prisma.livro.aggregate({
        _sum: { quantidadeTotal: true }
      });

      //todos os que ainda estão em andamento (com ou sem atraso)
      const emprestimosAtivos = await prisma.emprestimo.count({
        where: { status: 'EM_ANDAMENTO' }
      });

      //quais já passaram da data
      const emprestimosAtrasados = await prisma.emprestimo.count({
        where: {
          status: 'EM_ANDAMENTO',
          dataPrevistaDevolucao: { lt: hoje }
        }
      });

      const contagemPorCategoria = await prisma.livro.groupBy({
        by: ['categoria'],
        _count: { categoria: true }
      });

      const ultimosEmprestimos = await prisma.emprestimo.findMany({
        take: 4,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          livro: true
        }
      });

      //flag de status para o front-end na listagem
      const ultimosEmprestimosFormatados = ultimosEmprestimos.map((emp) => {
        const estaAtrasado = emp.status === 'EM_ANDAMENTO' && new Date(emp.dataPrevistaDevolucao) < hoje;
        return {
          ...emp,
          status: estaAtrasado ? 'ATRASADO' : emp.status 
        };
      });

      return res.status(200).json({
        totalLivros: totalLivros._sum.quantidadeTotal || 0,
        emprestimosAtivos, 
        emprestimosAtrasados, 
        contagemPorCategoria: contagemPorCategoria.map(item => ({
          categoria: item.categoria,
          quantidade: item._count.categoria
        })),
        ultimosEmprestimos: ultimosEmprestimosFormatados
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao carregar dados do dashboard." });
    }
  }
}

export default new DashboardController();