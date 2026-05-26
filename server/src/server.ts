import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
}));

app.use(express.json());
app.use(routes);

app.use(express.static(__dirname + "/public"));

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});