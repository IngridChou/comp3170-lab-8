import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function TodoForm(props) {
  const [title, setTitle] = useState(props.initialValue || "");

  useEffect(() => {
    setTitle(props.initialValue || "");
  }, [props.initialValue]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      title: title,
      finished: false,
      id: nanoid(),
    };

    if (props.initialValue) {
      props.updateTodo({ ...newTodo, id: props.initialValue.id });
    } else {
      props.addTodo(newTodo);
    }

    setTitle("");
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <TextField
              type="text"
              placeholder="Add new task..."
              onChange={handleTitleChange}
              value={title}
            />
          </Box>
          <Button variant="contained" type="submit">
            {props.initialValue ? "Update" : "Add"}
          </Button>
          {props.initialValue && (
            <Button variant="outlined" type="button" onClick={props.onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </form>
    </div>
  );
}
