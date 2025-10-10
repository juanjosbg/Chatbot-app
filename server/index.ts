import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRouter from "./api/chat";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
