import React, { useState, useRef, useEffect } from "react";
import './styles.css'
import TodoList from "./TodoList";
// imports v4 function from the uuid library and assigns it to the variable uuidv4
// v4 function generates a random UUID (Universally Unique Identifier) using the version 4 algorithm
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
	// declares a state variable named "todos" using the useState hook
	// the "todos" variable is initialized with an array
	// a function called "setTodos" is declared, that is used to update the value of the "todos" variable
	const [todos, setTodos] = useState([]);

	// gets the name of the todo entered in the input box using the useRef hook
	const todoNameRef = useRef();


	// ************************ SAVING EXISTING TODOS TO LOCAL STORAGE ************************ //

	// load the todo list that we saved in local storage
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		// if we have stored todos, set the todo list to be those stored todos
		if(storedTodos) {
		  setTodos(storedTodos);
		}
	}, []);

	// saves todo list to our local storage
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);


	// ************************ ADDING ABILITY TO CHECK AND UNCHECK TODOS ************************ //

	function toggleTodo(id) {
    // create a copy of the current todo list using the spread operator
		const newTodos = [...todos];

    // find the todo that matches the id we're looking for
		const todo = newTodos.find((todo) => todo.id === id);

    // toggle todo and set the modified list
		todo.complete = !todo.complete;
		setTodos(newTodos);
	}


	// ************************ ADDING A NEW TODO TO EXISTING LIST ************************ //
	function handleAddTodo(e) {
		const name = todoNameRef.current.value;
		if (name === "") {
			return;
		}

		// adds the new todo to the list of previous todos
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
		});

		// clear input box once the new todo has been added
		todoNameRef.current.value = null;
	}

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

	return (
		<>
    <div id="container">
      <h1 id="todo-title">To-do List</h1>

      <div id="todo-list">
        <div id="todos-left">{todos.filter(todo => !todo.complete).length} tasks left to do:</div>
        <TodoList todos={todos} toggleTodo={toggleTodo} id="todo-items" />
        <input ref={todoNameRef} type="text" id="todo-input" placeholder="Add a new task"/>
        <i class="fa-solid fa-circle-plus" onClick={handleAddTodo} title="Add new to-do" id="add-todo-button"></i>
        <i class="fa-solid fa-trash-can" onClick={handleClearTodos} title="Clear completed to-dos" id="clear-todos-button"></i>
      </div>
    </div>
		</>
	);
}

export default App;
