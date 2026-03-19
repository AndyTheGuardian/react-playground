import { useState } from "react";

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
  onEdit: (id: number, newText: string) => void;
};

function TodoItem({
  id,
  text,
  completed,
  onDelete,
  onToggle,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  function handleSave() {
    onEdit(id, editText);
    setIsEditing(false);
  }

  return (
    <li className="flex items-center justify-between py-2 border-b">
      {isEditing ? (
        <>
          <input
            className="flex-1 border rounded p-1 mr-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <input
            className="mr-2"
            type="checkbox"
            checked={completed}
            onChange={onToggle}
          />
          <span
            onClick={onToggle}
            className={`flex-1 cursor-pointer ${
              completed ? "line-through text-gray-400" : ""
            }`}
          >
            {text}
          </span>

          <div className="flex gap-2 ml-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="text-red-500 hover:underline" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
