import React from "react";

function Todo({ todo, toggleComplete, removeTodo }) {
    
    function handleCheckboxClick() {
        toggleComplete(todo.id);
    }

    function handleRemoveClick() {
        removeTodo(todo.id);
    }

    return (
      <div style={styles.container}>
        <input type="checkbox" onClick={handleCheckboxClick} />
        <li
          style={{
            color: "black",
            textDecoration: todo.completed ? "line-through" : null,
          }}
        >
          {todo.task}
        </li>
        <button onClick={handleRemoveClick}>x</button>
      </div>
    );
}

const styles = {
    container: {
        display: "flex",
    }
}

export default Todo;