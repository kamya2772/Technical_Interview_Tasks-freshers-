import React, { useState, useEffect, useCallback } from "react";
import * as todoApi from "./frontend/todoApi"; // Import API functions
import TodoForm from "./frontend/TodoForm";
import TodoList from "./frontend/TodoList";
import "./App.css"; // Optional App-specific styles
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State for Editing ---
  const [editingTodoId, setEditingTodoId] = useState(null); // ID of todo being edited, null if none
  const [editText, setEditText] = useState(""); // Temporary text for the item being edited

  // --- Fetch Todos ---
  const fetchTodos = useCallback(async () => {
    // Keep loading check short if already loading
    if (!loading) setLoading(true);
    setError(null);
    try {
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError("Failed to fetch todos. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading]); // Recreate fetchTodos if loading state changes (less critical here)

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch only on initial mount

  // --- Add Todo ---
  const handleAddTodo = async (text) => {
    try {
      setError(null); // Clear previous errors
      const newTodo = await todoApi.createTodo(text);
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      setError("Failed to add todo.");
      console.error(err);
    }
  };

  // --- Toggle Complete ---
  const handleToggleComplete = async (id, isCompleted) => {
    // Prevent toggling while editing the same item
    if (editingTodoId === id) return;

    const originalTodos = [...todos]; // Store original state for potential rollback
    // Optimistic UI Update
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted } : todo
      )
    );
    try {
      setError(null); // Clear previous errors
      await todoApi.updateTodo(id, { isCompleted });
    } catch (err) {
      setError(`Failed to toggle todo ${id}.`);
      console.error(err);
      // Rollback optimistic update on error
      setTodos(originalTodos);
    }
  };

  // --- Delete Todo ---
  const handleDeleteTodo = async (id) => {
    // Prevent deleting while editing the same item visually (optional)
    if (editingTodoId === id) {
      handleCancelEdit(); // Optionally cancel edit before deleting
    }

    if (window.confirm("Are you sure you want to delete this todo?")) {
      const originalTodos = [...todos];
      // Optimistic UI Update
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      try {
        setError(null); // Clear previous errors
        await todoApi.deleteTodo(id);
      } catch (err) {
        setError(`Failed to delete todo ${id}.`);
        console.error(err);
        // Rollback optimistic update
        setTodos(originalTodos);
      }
    }
  };

  // --- Edit Handlers ---
  const handleStartEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditText(todo.text); // Pre-fill input with current text
    setError(null); // Clear errors when starting edit
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditText("");
  };

  const handleUpdateTodoText = async () => {
    if (!editText.trim()) {
      setError("Todo text cannot be empty.");
      // Optionally focus the input field here
      return;
    }
    if (!editingTodoId) return; // Should not happen if UI is correct

    const originalTodos = [...todos];
    // Optimistic UI update
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === editingTodoId ? { ...todo, text: editText.trim() } : todo
      )
    );
    const oldEditingId = editingTodoId; // Store ID in case of error
    setEditingTodoId(null); // Exit edit mode immediately for better UX

    try {
      setError(null); // Clear previous errors
      await todoApi.updateTodo(oldEditingId, { text: editText.trim() });
      setEditText(""); // Clear temp text state after successful save
    } catch (err) {
      setError(`Failed to update todo ${oldEditingId}.`);
      console.error(err);
      // Rollback optimistic update
      setTodos(originalTodos);
      // Optionally: re-enter edit mode on failure?
      // setEditingTodoId(oldEditingId); // Re-enter edit mode
    }
  };

  // --- Render Logic ---
  let content;
  if (loading) {
    content = <p className="text-center text-gray-500">Loading todos...</p>;
  } else {
    // Render TodoList even if there's an error, but show error message above/below
    content = (
      <TodoList
        todos={todos}
        editingTodoId={editingTodoId} // Pass editing state
        editText={editText} // Pass current edit text
        onEditTextChange={(e) => setEditText(e.target.value)} // Handler to update edit text
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
        onStartEdit={handleStartEdit} // Pass edit handlers
        onCancelEdit={handleCancelEdit}
        onUpdateTodo={handleUpdateTodoText} // Pass save handler
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        MERN Todo App
      </h1>
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Display general errors here */}
      {error && (
        <p className="text-center text-red-500 font-semibold my-3 p-2 bg-red-100 border border-red-300 rounded">
          {error}
        </p>
      )}

      <div className="mt-6">
        {" "}
        {/* Add some margin top */}
        {content}
      </div>
    </div>
  );
}

export default App;
