import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './Todo'
import { useEffect, useState } from 'react'

import { db } from './firebase'
import {addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f00ed] to-[#1c85e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `mt-3 flex justify-between`,
  input: `border p-2 px-5 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e)

    if(input === '') {
      alert("Please enter a valid todo")
      return
    }
    
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false
    })

    return setInput('')

  }

  // Read todo
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });

      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  // Update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id)).then(() => alert('Todo deleted successFully'))
  }

  return (
   <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo"/>
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.length === 0 ? (
            <p className="text-center p-3">Empty todo...</p>
          ) : (
            <>
            {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
            </>
          )}
        </ul>
        <p className={style.count}>You have {todos.length} todos</p>
      </div>
   </div>
  )
}

export default App
