import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "https://pta-squad-sofia.vercel.app",
];

const vercelPreviewPattern = /^https:\/\/pta-squad-sofia(-[a-z0-9]+-sofia-s-projects5)?\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
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
  console.log("📦 Server running");
});