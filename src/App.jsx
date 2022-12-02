import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        setTodos((state) => [...state, json.title]);
      });
  }, []);
  const inputRef = useRef();
  return (
    <div className="container-wrapper">
      <div className="container">
        <input
          className="todo-text"
          placeholder={"Learn React..."}
          ref={inputRef}
        />
        <button
          className="todo-button"
          onClick={async () => {
            if (inputRef.current.value.trim() !== "") {
              await setTodos((state) => [...state, inputRef.current.value]);
              inputRef.current.value = "";
            }
          }}>
          +
        </button>
      </div>
      {todos.map((item, index) => {
        return (
          <div key={index} className="container">
            <div className="todo-text">{item}</div>
            <button
              className="todo-button"
              onClick={() => {
                setTodos((state) => state.filter((i) => i !== item));
              }}>
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
