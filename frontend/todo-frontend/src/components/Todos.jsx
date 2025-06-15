export function Todos({ todos, onTodoDeleted,onTodoUpdated }) {
    console.log(todos);
    return (
        <div>{
        todos.map((todo) => (
            <div key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.status ? "Completed" : "Pending"}</p>
                <button onClick={() => {
                    fetch(`http://localhost:3000/todo-status`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: todo._id, status: !todo.status })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        onTodoUpdated({id:todo._id, title: todo.title, description: todo.description, status: !todo.status}); // Call the onTodoUpdated function to update the todo list
                        // Optionally, you can update the UI or state here
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }}>Toggle Status</button>
                <button onClick={() => {
                    fetch('http://localhost:3000/todo-delete', {
                        method: 'DELETE',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: todo._id })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        onTodoDeleted({id:todo._id}); // Call the onTodoAdded function to update the todo list
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })

                }}>Delete Todo</button>
            </div>  
        ))
        }</div>
    );
}