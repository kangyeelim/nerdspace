import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@material-ui/core";

/**
 * TodoForm keeps track of our todo state through a form
 */

function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false,
    });

    function handleTaskInputChange(e) {
        setTodo({ ...todo, task: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (todo.task.trim()) {
            addTodo({ ...todo, id: uuidv4() });
        }
        //reset task input
        setTodo({ ...todo, task: "" });
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField style={styles.textinput}
                label="Task"
                name="task"
                type="text"
                value={todo.task}
                onChange={handleTaskInputChange}
            />
            <Button 
                type="submit" 
                size="medium" 
                color="primary"
                variant="contained"
            >
                Add
            </Button>
        </form>
    );
}

const styles = {
    textinput: {
        width: '30vw',
        maxWidth: '30vw',
        height: "auto",
        margin: "10px",
        color: "#3282b8"
    }
}

export default TodoForm;
