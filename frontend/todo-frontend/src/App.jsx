import { useEffect, useState } from 'react'
import './App.css'
import {CreateTodo} from './components/CreateTodo'
import { Todos } from './components/Todos'
function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/todos')
    .then(async (res)=> {
      const json = await res.json()
      console.log(json);
      setTodoList(json.todos);
    })
  },[])
  // this is better because it will update the state of the todoList and won't make request to database again.
  const onTodoAdded = (todo) => {
    setTodoList((prevTodos) => [...prevTodos, todo]);
  }
  const onTodoDeleted = (todo) => {
    setTodoList((prevTodos) => prevTodos.filter((t) => t._id !== todo.id));
  }
  const onTodoUpdated = (todo) => {
    setTodoList((prevTodos) => prevTodos.map((t) => t._id === todo.id ? todo : t));
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
        <CreateTodo onTodoAdded={onTodoAdded}/>
        <Todos onTodoDeleted={onTodoDeleted} onTodoUpdated={onTodoUpdated} todos={todoList}></Todos>
      </div>
    </>
  )
}

export default App