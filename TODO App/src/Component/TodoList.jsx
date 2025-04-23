import React from "react";
import { useState } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    if (isEditing) {
      const updatedTodo = todos.map((todo, index) => {
        return index === editingIndex
          ? { ...todo, text: task, completed: false }
          : todo;
      });
      setTodos(updatedTodo);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask("");
  };
  const handleDoneTask = (index) => {
    const updatedTodo = [...todos];
    updatedTodo[index].completed = !updatedTodo[index].completed;
    setTodos(updatedTodo);
  };
  const handleDeleteTask = (index) => {
    const updatedTodo = todos.filter((_, i) => i !== index);
    setTodos(updatedTodo);
  };

  const handleEditTask = (index) => {
    setTask(todos[index].text);
    setIsEditing(true);
    setEditingIndex(index);
  };
  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Todo App
        </h1>
        <form onSubmit={handleAddTask} className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            {isEditing ? "save" : "Add"}
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 rounded shadow-sm"
            >
              <span
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => handleDoneTask(index)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleEditTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✎
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
