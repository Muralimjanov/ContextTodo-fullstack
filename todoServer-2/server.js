import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { register, login } from "./routes/auth-routes.js";
import {
  createTodo,
  getTodo,
  deleteTodo,
  completed,
  important,
} from "./routes/todo-routes.js";

const app = express();
app.use(express.json({ extented: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@context.ep5a8gp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

// register requests
app.post(
  "/api/auth/register",
  [
    body("email", "Некорректный Email").isEmail(),
    body("password", "Пароль должен быть Минимум 5 символов").isLength({
      min: 5,
    }),
  ],
  register
);
app.post("/api/auth/login", login);

// todo requests
app.post("/api/todo/add", createTodo);
app.get("/api/todo", getTodo);
app.delete("/api/todo/delete/:id", deleteTodo);

app.patch("/api/todo/completed/:id",completed);
app.patch("/api/todo/important/:id",important);

const PORT = 5555;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
