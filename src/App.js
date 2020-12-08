import React, { useState, useReducer } from "react";

export default function App() {
  const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo"
  };

  const addTodo = (name) => {
    return {
      id: Date.now(),
      name,
      completed: false
    };
  };

  // this is the reducer fn goes as 1st arg for useReducer
  // todos refers to state in the hook and dispatch is responsible for actions
  const reducer = (todos, action) => {
    console.log(action.type);
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, addTodo(action.payload.name)];
      case ACTIONS.TOGGLE_TODO:
        return todos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo;
        });
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo) => todo.id !== action.payload.id);
      default:
        return todos;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: newTodo } });

    // Clear text box
    createNewTodo("");
  };

  // state refers to the 2nd arg in useReducer
  // dispatch used for actions on the state ...
  const [todos, dispatch] = useReducer(reducer, []);
  const [newTodo, createNewTodo] = useState("");

  return (
    <div className="App">
      <h1>ToDos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">Add: </label>
        <input
          type="text"
          name="newTodo"
          value={newTodo}
          placeholder="Add todo ..."
          onChange={(e) => createNewTodo(e.target.value)}
        />
      </form>
      <ul>
        {todos.length &&
          todos.map((todo) => (
            <li
              key={todo.id}
              style={{ color: todo.completed ? "green" : "blue" }}
            >
              {todo.name}
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_TODO,
                    payload: { id: todo.id }
                  })
                }
              >
                toggle
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.DELETE_TODO,
                    payload: { id: todo.id }
                  })
                }
              >
                delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
