/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { HTTP_STATUS } from "./helpers";
/* ROUTE IMPORTS */
import projectRoutes from "./routes/projectRoutes";
import searchRoutes from "./routes/searchRoutes";
import taskRoutes from "./routes/taskRoutes";
import teamRoutes from "./routes/teamRoutes";
import userRoutes from "./routes/userRoutes";

/* CONFIGURATIONS */
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.get("/", (_req, res) => {
  setTimeout(() => {
    res.status(HTTP_STATUS.OK).send("OK");
  }, 200);
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

/* SERVER */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole: false positive
  console.log(`Server is running on port ${port}`);
});
