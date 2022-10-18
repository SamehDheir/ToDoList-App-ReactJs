import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmut = (e) => {
    e.preventDefault();

    if(editId){
    const editTodo = todos.find((i) => i.id === editId);
    const updatedTodos = todos.map((t) => 
      t.id === editTodo.id
        ? (t = { id: t.id, todo })
        : { id: t.id, todo: t.todo }
    );
    setTodos(updatedTodos);
    setEditId(0);
    setTodo("");
    return;
  }

   

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
    setTodo('')
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((v) => v.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDoList App</h1>

        <form onSubmit={handleSubmut}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "EDIT" : "GO"}</button>
        </form>

        <ul>
          {todos.map((m) => (
            <li>
              <span key={m.id}>{m.todo}</span>
              <button onClick={() => handleEdit(m.id)}>EDIT</button>
              <button onClick={() => handleDelete(m.id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
