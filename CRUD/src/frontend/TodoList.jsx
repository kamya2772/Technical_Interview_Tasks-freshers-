// client/src/components/TodoList.jsx
import React from "react";

function TodoList({
  todos,
  editingTodoId, // ID of the todo being edited
  editText, // Current text in the edit input
  onEditTextChange, // Function to update editText state in App
  onToggleComplete,
  onDeleteTodo,
  onStartEdit, // Function to enter edit mode
  onCancelEdit, // Function to cancel edit mode
  onUpdateTodo, // Function to save the edited text
}) {
  if (!todos || todos.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => {
        const isEditing = todo._id === editingTodoId;

        return (
          <li
            key={todo._id}
            className={`flex items-center justify-between p-4 bg-white rounded-md shadow transition duration-150 ease-in-out ${
              todo.isCompleted && !isEditing
                ? "bg-green-50 opacity-60"
                : "bg-white" // Dim completed, unless editing
            }`}
          >
            {isEditing ? (
              // --- Edit Mode ---
              <div className="flex-grow flex items-center space-x-2">
                <input
                  type="text"
                  value={editText}
                  onChange={onEditTextChange}
                  className="flex-grow p-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus // Automatically focus input on edit
                  onKeyDown={(e) => {
                    // Optional: Save on Enter, Cancel on Escape
                    if (e.key === "Enter") onUpdateTodo();
                    if (e.key === "Escape") onCancelEdit();
                  }}
                />
                <button
                  onClick={onUpdateTodo}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-sm transition duration-150 ease-in-out"
                >
                  Save
                </button>
                <button
                  onClick={onCancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded text-sm transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // --- View Mode ---
              <>
                <span
                  className={`flex-grow cursor-pointer mr-3 ${
                    // Added margin-right
                    todo.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                  onClick={() => onToggleComplete(todo._id, !todo.isCompleted)}
                  title="Click to toggle complete"
                >
                  {todo.text}
                </span>
                <div className="flex-shrink-0 space-x-2">
                  {" "}
                  {/* Group buttons */}
                  <button
                    onClick={() => onStartEdit(todo)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-1 px-3 rounded text-sm transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTodo(todo._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
