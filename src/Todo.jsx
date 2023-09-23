import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplate: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex gap-5`,
    text: `cursor-pointer`,
    textComplate: `cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`
}

function Todo({todo, toggleComplete, deleteTodo}) {

  return (
    <li className={todo.completed ? style.liComplate : style.li}>
        <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplate : style.text}>{todo.text}</p>
        </div>
        <button className={style.button} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
    </li>
  )
}

export default Todo