import { Request, Response } from "express";
import  prisma  from "../database"; 

class EmprestimoController {

  async create(req: Request, res: Response) {
    const { nomeCliente, emailCliente, dataPrevistaDevolucao, livroId } = req.body;

    try {
      const resultado = await prisma.$transaction(async (tx) => {
        const livro = await tx.livro.findUnique({ where: { id: livroId } });
        
        if (!livro || livro.quantidadeDisponivel <= 0) {
          throw new Error("Livro não encontrado ou sem estoque disponível.");
        }

        const novoEmprestimo = await tx.emprestimo.create({
          data: {
            nomeCliente,
            emailCliente,
            dataPrevistaDevolucao: new Date(dataPrevistaDevolucao),
            livroId
          }
        });

        await tx.livro.update({
          where: { id: livroId },
          data: { quantidadeDisponivel: { decrement: 1 } }
        });

        return novoEmprestimo;
      });

      return res.status(201).json(resultado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async get(req: Request, res: Response) {
    const { cliente } = req.query;

    try {
      const emprestimos = await prisma.emprestimo.findMany({
        where: {
          nomeCliente: cliente ? { contains: String(cliente), mode: 'insensitive' } : undefined
        },
        include: { livro: true }
      });

      const formattedLoans = emprestimos.map((loan) => ({
        id: loan.id,
        customerName: loan.nomeCliente,
        customerEmail: loan.emailCliente,
        rentalDate: loan.dataLocacao,
        dueDate: loan.dataPrevistaDevolucao,
        status: loan.status,
        bookId: loan.livroId,
        book: {
          id: loan.livro.id,
          title: loan.livro.titulo,
          author: loan.livro.autor,
        }
      }));

      return res.status(200).json(formattedLoans);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar empréstimos." });
    }
  }
  async updateStatus(req: Request, res: Response) {
  const { id } = req.params; 
  const { status } = req.body; 

  try {
    const updatedEmprestimo = await prisma.emprestimo.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(updatedEmprestimo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar o status do empréstimo." });
  }
}
}

export default new EmprestimoController();