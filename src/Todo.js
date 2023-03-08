import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick(){
    toggleTodo(todo.id)
  }

  return (
    <div id="todo-item">
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            <span>{todo.name}</span>
    </div>
  )
}
