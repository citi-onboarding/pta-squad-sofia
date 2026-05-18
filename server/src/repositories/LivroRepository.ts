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
  return await prisma.livro.delete({
    where: { id: bookId }
  });
}