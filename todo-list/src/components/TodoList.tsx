import { useState } from "react";

import "../TodoList.css";

interface TodoListProps {
    todos: { id: number; name: string }[];
    onDeleteTodo: (id: number) => void;
    onCopyTodo: (data: string) => void;
}

function TodoList({ todos, onDeleteTodo, onCopyTodo }: TodoListProps) {
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
                style={{ cursor: "default" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)} // Call onDeleteTodo with the todo id
            >
                {todo.name}
                {hoveredIndex === index && (
                    <div className="d-flex" title="Copy to Clipboard">
                        <span
                            className="material-symbols-outlined pointer-cursor"
                            onClick={() => onCopyTodo(todo.name)}
                        >
                            content_copy
                        </span>
                        <span
                            className="material-symbols-outlined pointer-cursor"
                            title="Delete Todo"
                            onClick={() => onDeleteTodo(todo.id)}
                        >
                            delete
                        </span>
                    </div>
                )}
            </button>
        ));
    };

    return (
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
