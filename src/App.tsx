// import UserCard from "./UserCard";

// function App() {
//   const [users, setUsers] = useState([
//     { name: "Anna", age: 22 },
//     { name: "John", age: 30 },
//     { name: "Mike", age: 28 },
//   ]);

//   const [count, setCount] = useState(0);

//   const [inputName, setInputName] = useState("");
//   const [inputAge, setInputAge] = useState(0);

//   return (
//     <div>
//       <h1>Users</h1>

//       {users.map((user) => (
//         <UserCard
//           key={user.name}
//           name={user.name}
//           age={user.age}
//           isSenior={user.age > 26}
//         />
//       ))}

//       <p>Button clicked: {count}</p>

//       <button onClick={() => setCount(count + 1)}>Click me</button>
//       <label>Name: </label>
//       <input value={inputName} onChange={(e) => setInputName(e.target.value)} />
//       <label>Age: </label>
//       <input
//         type="number"
//         value={inputAge}
//         onChange={(e) => setInputAge(Number(e.target.value))}
//       />
//       <button
//         onClick={() => setUsers([...users, { name: inputName, age: inputAge }])}
//       >
//         Add User
//       </button>
//     </div>
//   );
// }
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [filter, setFilter] = useState<Filter>("all");

  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Learn React", completed: false },
          { id: 2, text: "Build Todo App", completed: false },
        ];
  });

  const [input, setInput] = useState("");

  function addTodo() {
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function editTodo(id: number, newText: string) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center text-black dark:text-gray-50">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a todo..."
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between mb-4 text-sm">
          <button
            className={filter === "all" ? "font-bold text-blue-500" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "font-bold text-blue-500" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "font-bold text-blue-500" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* List */}
        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
