import React, { useState } from 'react'
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {postTodo} from "./services"

function AddTodo() {
    const queryClient = useQueryClient()
    const [todoTitle, setTodoTitle] = useState("")
    const [todoDescription, setTododescription] = useState('')

    const {mutateAsync: addTodoAsync, isLoading: isAdding   } = useMutation({
      mutationFn: postTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    })
    const handleChange = (e)=>{
      if(e.target.name == "todoTitle"){
        setTodoTitle(e.target.value)
      } else if(e.target.name == "todoDescription"){
        setTododescription(e.target.value)
      }
    }
    const handleAddTodo = async()=>{
        const newTodo = {
          title: todoTitle,
          description: todoDescription
        };
        await addTodoAsync(newTodo)
        setTodoTitle("")
        setTododescription("")
    }
  return (
    <div className='flex gap-4 my-6 w-full'>
        <input type="text" name='todoTitle' value={todoTitle} onChange={handleChange} 
          className="border-2 py-3 px-4 w-30 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
          placeholder="Title" 
        />

        <input type="text" name='todoDescription' value={todoDescription} onChange={handleChange} 
          className="border-2 py-3 px-4 w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
          placeholder="Description" 
        />

        <button onClick={handleAddTodo} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {
            isAdding ? "Adding...": "Add"
          }
          
        </button>
    </div>
  )
}

export default AddTodo