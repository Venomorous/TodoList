import { useState, ChangeEvent, useReducer } from "react";
import TodoList from "./components/TodoList";
import "./TodoList.css";

export const ACTIONS = {
    ADD_TODO: "add-todo",
    REMOVE_TODO: "remove-todo",
    CLEAR_ALL: "clear-all",
    TOGGLE_TODO: "toggle-todo",
    COPY_TODO: "copy-todo",
};

interface Todo {
    id: number;
    name: string;
    complete: boolean;
}

type Action =
    | { type: typeof ACTIONS.ADD_TODO; payload: { name: string; id: number } }
    | { type: typeof ACTIONS.REMOVE_TODO; payload: { id: number } }
    | { type: typeof ACTIONS.TOGGLE_TODO; payload: { id: number } }
    | { type: typeof ACTIONS.CLEAR_ALL };

function reducer(todos: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)];
        case ACTIONS.TOGGLE_TODO:
            return todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, complete: !todo.complete };
                }
                return todo; // Return the original todo if the condition isn't met
            });
        case ACTIONS.REMOVE_TODO:
            return todos.filter((todo) => todo.id !== action.payload.id);
        case ACTIONS.CLEAR_ALL:
            return [];
        case ACTIONS.COPY_TODO:
            todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    navigator.clipboard.writeText(todo.name);
                }
            });
            return todos;
        default:
            return todos;
    }
}

function newTodo(name: string): Todo {
    return { id: Date.now(), name: name, complete: false };
}

function App() {
    //--------THIRD VARIATION---------//

    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim() !== "") {
            const id = Date.now();
            const action = {
                type: ACTIONS.ADD_TODO,
                payload: {
                    name,
                    id,
                },
            };
            dispatch(action);
            setName("");
        } else {
            alert("Please enter a todo");
        }
    };

    // console.log(todos);

    return (
        <>
            {/* <div className="container">
                <h1 className="text-center mt-5">Todo List</h1>
                <div className="row mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter todo"
                        aria-label="Todo"
                        aria-describedby="basic-addon1"
                    />
                    <div className="row">
                        <button
                            type="button"
                            className="btn btn-danger mt-2 me-2 col"
                        >
                            Clear all
                        </button>
                        <button
                            type="button"
                            className="btn btn-success mt-2 ms-2 col"
                        >
                            Add todo
                        </button>
                    </div>
                </div>
                <TodoList todos={todos} />
            </div> */}
            <div className="container">
                <h1 className="text-center mt-5">Todo List</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        placeholder="Enter todo"
                        aria-label="Todo"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="row">
                        <button
                            type="button"
                            className="btn btn-danger mt-2 me-2 col"
                            onClick={() =>
                                dispatch({ type: ACTIONS.CLEAR_ALL })
                            }
                        >
                            Clear all
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success mt-2 ms-2 col"
                        >
                            Add todo
                        </button>
                    </div>
                </form>
                <TodoList todos={todos} dispatch={dispatch} />
            </div>
        </>
    );

    //--------------------------------------------------------------------------------//

    // const todos = [
    //     { id: 1, name: "Create TodoList" },
    //     { id: 2, name: "Add buttons" },
    // ];
    //--------------------------------------------------------------------------------//
    // const [todos, setTodos] = useState<{ id: number; name: string }[]>([]);
    // const [inputValue, setInputValue] = useState("");
    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(event.target.value);
    // };
    // const handleDeleteTodo = (id: number) => {
    //     const updatedTodos = todos.filter((todo) => todo.id !== id);
    //     setTodos(updatedTodos);
    // };
    // const handleCopyTodo = (data: string) => {
    //     navigator.clipboard.writeText(data);
    // };
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
    // const handleAddTodo = () => {
    //     const name = inputValue.trim();
    //     const id = todos.length + 1;
    //     name !== ""
    //    //     ? setTodos([...todos, { id, name }])
    //         : alert("Please enter a todo");
    //     // name !== "" && setTodos([...todos, { id, name }]);
    //     setInputValue("");
    // };
    // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         handleAddTodo();
    //     }
    // };
    // const handleClearAll = () => {
    //     setTodos([]);
    // };
    // return (
    //     <div className="container">
    //         <h1 className="text-center mt-5">Todo List</h1>
    //         <div className="row mt-3">
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Enter todo"
    //                 aria-label="Todo"
    //                 aria-describedby="basic-addon1"
    //                 value={inputValue}
    //                 onChange={handleInputChange}
    //                 onKeyPress={handleKeyPress}
    //             />
    //             <div className="row">
    //                 <button
    //                     type="button"
    //                     className="btn btn-danger mt-2 me-2 col"
    //                     onClick={handleClearAll}
    //                 >
    //                     Clear all
    //                 </button>
    //                 <button
    //                     type="button"
    //                     className="btn btn-success mt-2 ms-2 col"
    //                     onClick={handleAddTodo}
    //                 >
    //                     Add todo
    //                 </button>
    //             </div>
    //         </div>
    //         <TodoList
    //             todos={todos}
    //             onDeleteTodo={handleDeleteTodo}
    //             onCopyTodo={handleCopyTodo}
    //         />
    //     </div>
    // );
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
