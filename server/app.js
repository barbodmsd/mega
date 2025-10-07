import express from "express";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import { catchError, HandleERROR } from "vanta-api";

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(morgan("dev"));

// routes

app.use((req, res, next) => {
  return next(new HandleERROR("Invalid Route.", 404));
});
app.use(catchError);

export default app;
