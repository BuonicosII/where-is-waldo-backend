import express, { json, urlencoded } from "express";
import cors from "cors";
//import path, { join } from "path";
//import { fileURLToPath } from "url";
import createError from "http-errors";
import indexRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

app.listen(3000);
