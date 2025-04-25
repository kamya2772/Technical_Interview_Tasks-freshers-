// backend/routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo"); // Import the model

// --- CRUD Routes ---

// CREATE: Add a new todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Todo text is required" });
    }
    const newTodo = new Todo({ text });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo); // 201 Created
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({
        message: "Server error while creating todo",
        error: error.message,
      });
  }
});

// READ: Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching todos",
        error: error.message,
      });
  }
});

// UPDATE: Toggle completion status or update text
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isCompleted } = req.body;

    const updateData = {};
    if (text !== undefined) updateData.text = text;
    // Check specifically for boolean true/false, not just truthy/falsy
    if (typeof isCompleted === "boolean") updateData.isCompleted = isCompleted;

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No update data provided (text or isCompleted)" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return the updated doc, run schema validation
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    if (error.kind === "ObjectId") {
      // Handle invalid MongoDB ID format
      return res.status(400).json({ message: "Invalid Todo ID format" });
    }
    res
      .status(500)
      .json({
        message: "Server error while updating todo",
        error: error.message,
      });
  }
});

// DELETE: Remove a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // Send back the ID of the deleted item, or just a success message
    res.json({ message: "Todo deleted successfully", id: deletedTodo._id });
  } catch (error) {
    console.error("Error deleting todo:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Todo ID format" });
    }
    res
      .status(500)
      .json({
        message: "Server error while deleting todo",
        error: error.message,
      });
  }
});

module.exports = router;
