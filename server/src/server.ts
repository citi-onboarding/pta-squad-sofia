import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Bloqueado pelo CORS: Origem não permitida."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("Server running");
});