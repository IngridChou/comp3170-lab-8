import { useState } from "react";
import { format } from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";

export default function Todo(props) {
  const todo = props.todo;
  const [completedTime, setCompletedTime] = useState(null);

  function handleDelete() {
    props.remove(todo);
  }

  function handleStatusChange() {
    if (!todo.finished) {
      setCompletedTime(new Date());
    } else {
      setCompletedTime(null);
    }
    props.toggleFinished(todo);
  }

  return (
    <li className="todo">
      <div className="todo-details">
        <p>
          <span>
            <Checkbox
              color="default"
              onChange={handleStatusChange}
              checked={todo.finished}
            />

            {todo.finished === true ? (
              <>
                <del>{todo.title}</del> ✧ Created at:{" "}
                {format(new Date(todo.createdTime), "yyyy-MM-dd HH:mm:ss")} ✦
                Completed at:{" "}
                {completedTime
                  ? format(completedTime, "yyyy-MM-dd HH:mm:ss")
                  : ""}
              </>
            ) : (
              <>
                {todo.title} ✧ Created at:{" "}
                {format(new Date(todo.createdTime), "yyyy-MM-dd HH:mm:ss")}
              </>
            )}
          </span>
        </p>
      </div>
      <Stack direction="row" spacing={2} onClick={handleDelete}>
        <Fab
          color="primary"
          aria-label="edit"
          onClick={() => props.setEditing(todo.id)}
        >
          <EditIcon />
        </Fab>
        <Fab color="primary" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="error" />
        </Fab>
      </Stack>
    </li>
  );
}
