import React from 'react'
import deleteIcon from "./assets/deleteIcon.svg"
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {getTodos, deleteTodo} from "./services"

const TodoItem = ({id, title, description, onDelete})=>{
  return(
    <div className="rounded-lg w-70 shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-left p-4">
      <div className="flex items-center cursor-pointer gap-2">
        <h1 className="text-xl font-bold"> {title} </h1>
        <img className='w-8 h-8' src={deleteIcon} onClick={()=>onDelete(id)} />
      </div>
      <p> {description} </p>
      </div>
  )
};

function TodoList() {
  const queryClient = useQueryClient()
  const { data: allTodos, error, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const {mutateAsync: deleteTodoAsync } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleDeleteTodo = async(todoId)=>{
    await deleteTodoAsync(todoId)
  };
  return (
    <div className="space-y-4">
      { allTodos && allTodos.map((todo, index)=> 
        <TodoItem key={index} 
          id={todo.id} 
          title={todo.title} 
          description={todo.description} 
          onDelete={handleDeleteTodo} 
        /> )
      }
    </div>
  )
}

export default TodoList;
