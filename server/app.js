import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { catchError, HandleERROR } from "vanta-api";
import IsLogin from "./middlewares/IsLogin.js";
import Validation from "./middlewares/Validation.js";
import authRouter from "./routes/auth.route.js";
import fileRouter from "./routes/file.route.js";
import folderRouter from "./routes/folder.route.js";
import userRouter from "./routes/user.route.js";
import { swaggerSpec, swaggerUi } from "./utils/swagger.js";
import uploadRouter from "./routes/upload.route.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use("/upload", express.static(`${__dirname}/public`));
app.use(cors());
app.use(morgan("dev"));
app.use(Validation);

// routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use(IsLogin);
app.use("/api/upload", uploadRouter);
app.use("/api/user", userRouter);
app.use("/api/file", fileRouter);
app.use("/api/folder", folderRouter);
app.use((req, res, next) => {
  return next(new HandleERROR("Invalid Route.", 404));
});
app.use(catchError);

export default app;
