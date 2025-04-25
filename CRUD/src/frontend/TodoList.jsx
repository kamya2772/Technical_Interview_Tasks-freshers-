// client/src/components/TodoList.jsx
import React from "react";

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  if (!todos || todos.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex items-center justify-between p-4 bg-white rounded-md shadow transition duration-150 ease-in-out ${
            todo.isCompleted
              ? "bg-green-50 line-through text-gray-400"
              : "bg-white"
          }`}
        >
          <span
            className={`flex-grow cursor-pointer ${
              todo.isCompleted ? "text-gray-500" : "text-gray-800"
            }`}
            onClick={() => onToggleComplete(todo._id, !todo.isCompleted)}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDeleteTodo(todo._id)}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-150 ease-in-out"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
