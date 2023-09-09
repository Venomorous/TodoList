import { useState } from "react";

import "../TodoList.css";
import { ACTIONS } from "../App";

interface TodoListProps {
    todos: { id: number; name: string; complete: boolean }[];
    dispatch: React.Dispatch<any>;
    // onDeleteTodo: (id: number) => void;
    // onCopyTodo: (data: string) => void;
}

function TodoList({ todos, dispatch }: TodoListProps) {
    //-----------------ul,li VARIATION-----------------//

    // const showtodos = () => {
    //     return todos.map((todo) => (
    //         <li key={todo.id} className="list-group-item">
    //             {todo.id}. {todo.name}
    //         </li>
    //     ));
    // };

    //-----------------div, button VARIATION-----------------//

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const showtodos = () => {
        return todos.map((todo, index) => (
            <button
                key={todo.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                style={{
                    cursor: "default",
                    // backgroundColor: todo.complete ? "#25c70c" : "",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)} // Call onDeleteTodo with the todo id
            >
                <span className={`text- ${todo.complete ? "completed" : ""}`}>
                    {todo.name}
                </span>
                {hoveredIndex === index && (
                    <div className="d-flex" title="Todo options">
                        <span
                            className="material-symbols-outlined"
                            title="Mark as done"
                            onClick={() =>
                                dispatch({
                                    type: ACTIONS.TOGGLE_TODO,
                                    payload: { id: todo.id },
                                })
                            }
                        >
                            done
                        </span>
                        <span
                            className="material-symbols-outlined pointer-cursor"
                            title="Copy Todo"
                            onClick={() =>
                                dispatch({
                                    type: ACTIONS.COPY_TODO,
                                    payload: { id: todo.id },
                                })
                            }
                        >
                            content_copy
                        </span>
                        <span
                            className="material-symbols-outlined pointer-cursor"
                            title="Delete Todo"
                            onClick={() =>
                                dispatch({
                                    type: ACTIONS.REMOVE_TODO,
                                    payload: { id: todo.id },
                                })
                            }
                        >
                            delete
                        </span>
                    </div>
                )}
            </button>
        ));
    };

    const toggleComplete = (todo: { id: number }) => {
        const action = {
            type: ACTIONS.TOGGLE_TODO,
            payload: {
                id: todo.id,
            },
        };
        dispatch(action);
    };

    return (
        // <div>
        //     {todos.map((todo) => (
        //         <div key={todo.id}>
        //             <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
        //                 {todo.name}
        //             </span>
        //             <button
        //                 onClick={() =>
        //                     dispatch({
        //                         type: ACTIONS.TOGGLE_TODO,
        //                         payload: { id: todo.id },
        //                     })
        //                 }
        //             >
        //                 Toggle
        //             </button>
        //             <button
        //                 onClick={() =>
        //                     dispatch({
        //                         type: ACTIONS.REMOVE_TODO,
        //                         payload: { id: todo.id },
        //                     })
        //                 }
        //             >
        //                 Delete
        //             </button>
        //         </div>
        //     ))}
        // </div>
        <div className="mt-4 list-group">
            {/* <ul className="list-group">{showtodos()}</ul> */}
            {showtodos()}
        </div>
    );
}

// function TodoList({ todos }: TodoListProps) {
//     // const [todos, setTodos] = useState([]);

//     const showtodos = () => {
//         return todos.map((item) => {
//             <li key={item.id}>
//                 {item.id}. {item.name}
//             </li>;
//         });
//     };

//     return (
//         <div className="center mt-4">
//             <h1>Todo List</h1>
//             <ul>{showtodos()}</ul>
//         </div>
//     );
// }

export default TodoList;
