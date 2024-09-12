import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTodos = async()=>{
    const response = await axios.get(`${API_BASE_URL}/todo`)
    return response.data
}

export const postTodo = async (todo)=>{
    const response = await axios.post(`${API_BASE_URL}/todo`, todo)
    return response.data
}

export const deleteTodo = async (todo_id)=>{
    const response = await axios.delete(`${API_BASE_URL}/todo/${todo_id}`)
    return response.data
}