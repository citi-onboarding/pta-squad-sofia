import { Request, Response } from "express";
import { 
        createBookRepository, 
        searchBooksRepository,
        deleteBookRepository 
      } from "../repositories/LivroRepository";
import { Categoria } from "@prisma/client";


export const createBook = async (req: Request, res: Response) => {
  const { 
    title, 
    author, 
    isbn, 
    publisher, 
    totalQuantity, 
    category, 
    year 
  } = req.body;

  try {

    // Tratamento do título
    if (!title) {
      return res.status(400).json({ message: "Insira o título" });
    }


    // Tratamento do autor
    if (!author) {
      return res.status(400).json({ message: "Insira o nome do(a) autor(a)" });
    }

    // Tratamento do ISBN seguindo o padrão dele
    if (!isbn) {
      return res.status(400).json({ message: "Insira o ISBN" });
    }
        
    const normalizedISBN = isbn.replace(/[-\s]/g, "");

    if (!(/^(\d{10}|\d{13})$/.test(normalizedISBN))) {
      return res.status(400).json({ message: "Insira um ISBN válido" });
    }

    // Tratamento da editora
    if (!publisher) {
      return res.status(400).json({ message: "Insira uma editora" });
    }

    // Tratamento da quantidade inserida
    if (totalQuantity == null) {
      return res.status(400).json({ message: "Insira uma quantidade" });
    }

    const numberTotalQuantity = Number(totalQuantity);

    if (isNaN(numberTotalQuantity) || numberTotalQuantity <= 0) {
      return res.status(400).json({ message: "Insira uma quantidade válida" });
    }

    // Tratamento da categoria respeitando o enum
    if (!category) {
      return res.status(400).json({ message: "Insira uma categoria" });
    }

    if (!Object.values(Categoria).includes(category as Categoria)) {
      return res.status(400).json({ message: "Insira uma categoria válida" });
    }

    // Tratamento o ano respeitando a data atual
    if (year == null) {
      return res.status(400).json({ message: "Insira um ano" });
    }

    const numberYear = Number(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(numberYear) || numberYear <= 0 || numberYear > currentYear) {
      return res.status(400).json({ message: "Insira um ano válido" });
    }


    // Criação do livro
    const newBook = await createBookRepository(
      title, 
      author, 
      normalizedISBN, 
      publisher, 
      numberTotalQuantity, 
      category, 
      numberYear 
    );

    return res.status(201).json(newBook);
  }

  catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "ISBN já cadastrado no sistema"});
    }
    return res.status(500).json({ message: "Erro ao criar um novo livro" });
  }
}

export const searchBooks = async (req: Request, res: Response) => {
  const { title, author, category } = req.query;
  try {

    // Só manda os filtros enviados
    const filters: any = {};
    if (typeof title === "string") filters.title = title;
    if (typeof author === "string") filters.author = author;

    if (typeof category === "string" && Object.values(Categoria).includes(category as Categoria)) {
      filters.category = category;
    }


    const books = await searchBooksRepository(filters);

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar livros" });
  }
}


export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await deleteBookRepository(id);
    return res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch(error) {
    return res.status(500).json({ message: "Livro não encontrado" });
  }
}