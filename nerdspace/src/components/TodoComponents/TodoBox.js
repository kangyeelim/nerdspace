import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Typography from "@material-ui/core/Typography";

/**
 * TodoBox is the component that updates, populates and stores the todos
 */

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function TodoBox() {
    const [todos, setTodos] = useState([]);

    //populate todo list when app initally renders
    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    //store todos in local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    function addTodo(todo) {
        setTodos([todo, ...todos]);
    }

    function toggleComplete(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <header>
                <Typography variant="h6">Reminders</Typography>
                <TodoForm addTodo={addTodo} />
                <TodoList 
                    todos={todos}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                />
            </header>
        </div>
    )
}

export default TodoBox;
