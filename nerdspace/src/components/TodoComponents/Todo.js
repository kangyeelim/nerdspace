import React from "react";
import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Todo renders a todo object and handles its actions
 */

function Todo({ todo, toggleComplete, removeTodo }) {
    
    function handleCheckboxClick() {
        toggleComplete(todo.id);
    }

    function handleRemoveClick() {
        removeTodo(todo.id);
    }

    return (
        <ListItem style={styles.listItem}>
            <Checkbox color='primary' checked={todo.completed} onClick={handleCheckboxClick} />
            <Typography
                variant="body1"
                style={{
                    textDecoration: todo.completed ? "line-through" : null,
                }}
            >
                {todo.task}
            </Typography>
            <IconButton onClick={handleRemoveClick}><CloseIcon /></IconButton>
        </ListItem>
    );
}

const styles = {
    listItem: {
        display: "flex",
    }
}

export default Todo;