import express from "express";
import emprestimoController from "./controllers/EmprestimoController";
import dashboardController from "./controllers/DashboardController";
import { createBook, searchBooks, deleteBook, getBookById } from "./controllers/LivroController"

const routes = express.Router();

routes.post("/emprestimos", emprestimoController.create);
routes.get("/emprestimos", emprestimoController.get);

routes.post("/livros", createBook);
routes.get("/livros", searchBooks);
routes.get("/livros/:id", getBookById);
routes.patch("/livros/:id", deleteBook);

routes.get("/dashboard", dashboardController.get);
routes.patch("/emprestimos/:id/status", emprestimoController.updateStatus);
export default routes;