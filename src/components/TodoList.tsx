import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

function TodoList({ todos, onDelete, onToggle, onEdit }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onDelete={() => onDelete(todo.id)}
          onToggle={() => onToggle(todo.id)}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
