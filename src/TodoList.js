import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
  return (
    // the map method creates a new array by returning a Todo component for each element in the original todos array
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        // key prop isn't passed to the todo component, and is only used internally by react to identify components and optimize rendering
    })
  )
}
