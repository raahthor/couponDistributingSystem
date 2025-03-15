import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./DB/syncdb.js";
import  router from "./Routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await startDB();

app.use("/", router);

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("server running on port ", port);
  }
});
