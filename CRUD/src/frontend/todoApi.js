// client/src/services/todoApi.js
import axios from "axios";

// Use environment variable in production, otherwise default to local backend
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/todos";

export const getTodos = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // The array of todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Re-throw to be caught by the component
  }
};

export const createTodo = async (todoText) => {
  try {
    const response = await axios.post(API_BASE_URL, { text: todoText });
    return response.data; // The newly created todo object
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, updateData) => {
  // updateData could be { text: 'new text' } or { isCompleted: true } or both
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updateData);
    return response.data; // The updated todo object
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data; // Success message and deleted ID { message: '...', id: '...' }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
