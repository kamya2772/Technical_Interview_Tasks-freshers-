import React, { useState, useEffect, useCallback } from "react";
import * as todoApi from "./frontend/todoApi"; // Import API functions
import TodoForm from "./frontend/TodoForm";
import TodoList from "./frontend/TodoList";
import "./App.css"; // Optional App-specific styles
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Todos ---
  const fetchTodos = useCallback(async () => {
    setLoading(true);
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
  }, []); // Empty dependency array means this function is stable

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // Fetch on initial mount

  // --- Add Todo ---
  const handleAddTodo = async (text) => {
    try {
      const newTodo = await todoApi.createTodo(text);
      setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add to the beginning
    } catch (err) {
      setError("Failed to add todo.");
      console.error(err);
      // Optionally: show error to user more prominently
    }
  };

  // --- Toggle Complete ---
  const handleToggleComplete = async (id, isCompleted) => {
    // Optimistic UI Update (optional but improves perceived performance)
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted } : todo
      )
    );
    try {
      await todoApi.updateTodo(id, { isCompleted });
      // No need to re-fetch, state is already updated optimistically
      // Or if not doing optimistic: await fetchTodos();
    } catch (err) {
      setError(`Failed to toggle todo ${id}.`);
      console.error(err);
      // Rollback optimistic update on error
      fetchTodos(); // Re-fetch to get the correct state
    }
  };

  // --- Delete Todo ---
  const handleDeleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      // Optimistic UI Update
      const originalTodos = [...todos];
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      try {
        await todoApi.deleteTodo(id);
        // No need to re-fetch
      } catch (err) {
        setError(`Failed to delete todo ${id}.`);
        console.error(err);
        // Rollback optimistic update
        setTodos(originalTodos); // Or call fetchTodos()
      }
    }
  };

  // --- Render Logic ---
  let content;
  if (loading) {
    content = <p className="text-center text-gray-500">Loading todos...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500 font-semibold">{error}</p>;
  } else {
    content = (
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        MERN Todo App
      </h1>
      <TodoForm onAddTodo={handleAddTodo} />
      {content}
    </div>
  );
}

export default App;
