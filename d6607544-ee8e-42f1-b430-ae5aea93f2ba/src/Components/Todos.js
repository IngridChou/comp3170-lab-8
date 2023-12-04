import { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Button from "@mui/material/Button";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const startEditing = (taskId) => {
    setEditingTask(taskId);
  };

  const stopEditing = () => {
    setEditingTask(null);
  };

  const updateTodo = (updatedTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTask.id ? { ...todo, title: updatedTask.title } : todo,
    );
    setTodos(updatedTodos);
    stopEditing();
  };

  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, { ...newTodo, createdTime: new Date() }];
    setTodos(updatedTodos);
    stopEditing();
  };

  const removeTodo = (task) => {
    const updatedTodos = todos.filter((todo) => todo.id !== task.id);
    setTodos(updatedTodos);
  };

  const toggleFinished = (task) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === task.id ? { ...todo, finished: !todo.finished } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      {editingTask === null ? (
        <div>
          <ul>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                remove={removeTodo}
                toggleFinished={toggleFinished}
                setEditing={startEditing}
              />
            ))}
          </ul>
          <Button variant="contained" onClick={() => setEditingTask({})}>
            Add Task
          </Button>
        </div>
      ) : (
        <TodoForm
          addTodo={addTodo}
          updateTodo={updateTodo}
          initialValue={
            todos.find((todo) => todo.id === editingTask)?.title || ""
          }
          onCancel={stopEditing}
        />
      )}
    </div>
  );
}
