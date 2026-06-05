import express from "express";
import emprestimoController from "./controllers/EmprestimoController";
import dashboardController from "./controllers/DashboardController";
import { createBook, searchBooks, deleteBook, getBookById } from "./controllers/LivroController"
import { sendReminderEmail } from "./controllers/EmailController";


const routes = express.Router();

routes.post("/emprestimos", emprestimoController.create);
routes.get("/emprestimos", emprestimoController.get);

routes.post("/livros", createBook);
routes.get("/livros", searchBooks);
routes.get("/livros/:id", getBookById);
routes.patch("/livros/:id", deleteBook);

routes.get("/dashboard", dashboardController.get);
routes.patch("/emprestimos/:id/status", emprestimoController.updateStatus);
routes.post("/send-reminder", sendReminderEmail);
export default routes;