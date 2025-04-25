// client/src/components/TodoForm.jsx
import React, { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // Don't add empty todos
    onAddTodo(inputText);
    setInputText(""); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-r-md transition duration-150 ease-in-out"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
