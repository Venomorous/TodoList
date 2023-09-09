import { useState, ChangeEvent } from "react";
import TodoList from "./components/TodoList";
import "./TodoList.css";

function App() {
    // const todos = [
    //     { id: 1, name: "Create TodoList" },
    //     { id: 2, name: "Add buttons" },
    // ];
    const [todos, setTodos] = useState<{ id: number; name: string }[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleCopyTodo = (data: string) => {
        navigator.clipboard.writeText(data);
    };

    //--------FIRST VARIATION---------//

    // const handleAddTodo = () => {
    //     if (inputValue.trim() !== "") {
    //         const name = inputValue;
    //         const id = todos.length + 1;
    //         setTodos([...todos, { id, name }]);
    //         setInputValue("");
    //     } else {
    //         alert("Please enter a todo");
    //     }
    // };

    //--------SECOND VARIATION---------//

    const handleAddTodo = () => {
        const name = inputValue.trim();
        const id = todos.length + 1;

        name !== ""
            ? setTodos([...todos, { id, name }])
            : alert("Please enter a todo");
        // name !== "" && setTodos([...todos, { id, name }]);
        setInputValue("");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTodo();
        }
    };

    const handleClearAll = () => {
        setTodos([]);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Todo List</h1>
            <div className="row mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter todo"
                    aria-label="Todo"
                    aria-describedby="basic-addon1"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="row">
                    <button
                        type="button"
                        className="btn btn-danger mt-2 me-2 col"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>
                    <button
                        type="button"
                        className="btn btn-success mt-2 ms-2 col"
                        onClick={handleAddTodo}
                    >
                        Add todo
                    </button>
                </div>
            </div>
            <TodoList
                todos={todos}
                onDeleteTodo={handleDeleteTodo}
                onCopyTodo={handleCopyTodo}
            />
        </div>
    );

    // return (
    //     <>
    //         <div className="container">
    //             {/* <div className="row text-center mt-3">
    //                 <h1 mt-3>Todo List</h1>
    //             </div>
    //             <div className="row">
    //                 <h2>1. Align</h2>
    //             </div> */}
    //             <h1 className="text-center mt-5">Todo List</h1>
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Enter todo"
    //                 aria-label="Todo"
    //                 aria-describedby="basic-addon1"
    //             ></input>
    //             <button type="button" className="btn btn-success mt-2">
    //                 Add todo
    //             </button>
    //             <TodoList todos={todos} />
    //         </div>
    //     </>
    // );
}

export default App;
