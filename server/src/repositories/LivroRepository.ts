import prisma from "@database";
import { Categoria } from "@prisma/client";

export const createBookRepository = async (title: string, author: string, isbn: string, publisher: string, totalQuantity: number, category: Categoria, year: number) => {
  return await prisma.livro.create({
    data: {
      titulo: title,
      autor: author,
      isbn,
      editora: publisher,
      quantidadeTotal: totalQuantity,
      quantidadeDisponivel: totalQuantity,
      categoria: category,
      ano: year
    }
  });
}

export const searchBooksRepository = async (filters: any) => {
  return await prisma.livro.findMany({
    where: {
      ...(filters.title && {
        titulo: {
          contains: filters.title,
          mode: "insensitive"
        }
      }),
      ...(filters.author && {
        autor: {
          contains: filters.author,
          mode: "insensitive"
        }
      }),
      ...(filters.category && {
        categoria: filters.category,
      })
    }
  });
}

export const deleteBookRepository = async (bookId: string) => {
  return await prisma.$transaction(async (tx) => {
    const book = await tx.livro.findUnique({
      where: { id: bookId },
      select: { quantidadeTotal: true, quantidadeDisponivel: true }
    });

    if (!book) throw new Error("Livro não encontrado");

    if (book.quantidadeTotal > 1) {
      return await tx.livro.update({
        where: { id: bookId },
        data: {
          quantidadeTotal: { decrement: 1 },
          quantidadeDisponivel: { decrement: 1 }
        }
      });
    }

    await tx.emprestimo.deleteMany({
      where: { livroId: bookId }
    });
    return await tx.livro.delete({
      where: { id: bookId }
    });
  });
}

export const getBookByIdRepository = async (bookId: string) => {
  return await prisma.livro.findUnique({
    where: { id: bookId },
    include: {
      emprestimo: true
    }
  })
}