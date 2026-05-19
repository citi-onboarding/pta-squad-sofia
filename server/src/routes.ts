import express from "express";
import emprestimoController from "./controllers/EmprestimoController";
import dashboardController from "./controllers/DashboardController";

const routes = express.Router();

routes.post("/emprestimos", emprestimoController.create);
routes.get("/emprestimos", emprestimoController.get);

routes.get("/dashboard", dashboardController.get);
routes.patch("/emprestimos/:id/status", emprestimoController.updateStatus);
export default routes;