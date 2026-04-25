import express from "express";
import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} from "../controllers/todo.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/todos", authMiddleware, createTodo);
router.get("/todos", authMiddleware, getTodos);
router.put("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

export default router;