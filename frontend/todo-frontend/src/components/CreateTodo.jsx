import { useState } from 'react';

export function CreateTodo({onTodoAdded}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
        <h1>Create Todo</h1>
        <br/>
        <form>
            <input type="text" placeholder="Enter todo title" onChange={(e)=>{
                setTitle(e.target.value);
            }} />
            <br/>
            <input type="text" placeholder="Enter todo Description" onChange={(e)=>{
                setDescription(e.target.value);
            }} />
            <br/>
            <label>
                <input type="checkbox" />
                Completed
            </label>
            <br/>
            <button type="submit" onClick={
                (e) => {
                    e.preventDefault(); // Prevent the default form submission
                    fetch('http://localhost:3000/todo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({title, description})
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        onTodoAdded(data.todo); // Call the onTodoAdded function with the new todo
                        // Optionally, you can clear the form or update the UI
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            }>Add Todo</button>
        </form>
        </div>
    );
}