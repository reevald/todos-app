const express = require("express");

const router = express.Router();

// Controller
const {
  getAllTodos,
  getDetailTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");

// Router
// Create todo
router.post("/todo", createTodo);

// Read todo
// All todo
router.get("/todos", getAllTodos);
// Detail todo
router.get("/todo/:todoId", getDetailTodo);

// Update todo (flexible)
router.patch("/todo/:todoId", updateTodo);

// Delete todo
router.delete("/todo/:todoId", deleteTodo);

// Export module
module.exports = router;