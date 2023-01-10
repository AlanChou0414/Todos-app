import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const TodosItem = ({ todoItem, setTodoItem }) => {
  const handleTodoState = (id) => {
    setTodoItem(todoItem.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        state: !item.state
      }
    }))
  }
  const handleDeleteTodoItem = (id) => {
    setTodoItem(todoItem.filter(item => {
      return item.id !== id
    }))
  }

  return (
    <>
      {
        todoItem.map(item => {
          return (
            <li
              className='todo-item'
              key={item.id}
            >
              <div>
                <input
                  className='todo-item-checkbox'
                  type="checkbox"
                  id={item.id}
                  onClick={() => handleTodoState(item.id)}
                />
                <button
                  className='todo-item-button'
                  onClick={() => handleDeleteTodoItem(item.id)}
                >
                  <AiFillDelete color='#E84855' size={20} />
                </button>
                <span
                  className={item.state ? 'todo-item-content-done' : ''}
                >
                  {item.content}
                </span>
              </div>
            </li>
          )
        })
      }
    </>
  )
}

export default TodosItem
