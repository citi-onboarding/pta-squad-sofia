import { Request, Response } from "express";
import  prisma  from "../database";

class DashboardController {
  async get(req: Request, res: Response) {
    try {
      const hoje = new Date();

      const totalLivros = await prisma.livro.aggregate({
        _sum: { quantidadeTotal: true }
      });

      const emprestimosAtivos = await prisma.emprestimo.count({
        where: { status: 'EM_ANDAMENTO' }
      });

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

      return res.status(200).json({
        totalLivros: totalLivros._sum.quantidadeTotal || 0,
        emprestimosAtivos,
        emprestimosAtrasados,
        contagemPorCategoria: contagemPorCategoria.map(item => ({
          categoria: item.categoria,
          quantidade: item._count.categoria
        }))
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao carregar dados do dashboard." });
    }
  }
}

export default new DashboardController();