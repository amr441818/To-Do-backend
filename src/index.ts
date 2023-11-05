import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user";
import todosRoutes from "./routes/todo";
import helmet from "helmet";
const app = express();
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", todosRoutes);
app.use("/api", userRoutes);
app.use("/", (req, res) => {
  res.send("app running!");
});

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = error.statusCode;
    const message = error.message;

    res.status(status).json({ message: message });
  }
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
