import express from "express";
import { createBook, searchBooks, deleteBook } from "./controllers/LivroController"

const routes = express.Router();
routes.post("/livros", createBook);
routes.get("/livros", searchBooks);
routes.delete("/livros/:id", deleteBook);

export default routes;
