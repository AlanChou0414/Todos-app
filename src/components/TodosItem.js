// TODO: delete alert
import React, { useState } from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'

const TodosItem = ({ todoItem, setTodoItem }) => {
  const [editValue, setEditValue] = useState('')

  const handleTodoState = (id) => {
    setTodoItem(todoItem.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        state: !item.state
      }
    }))
    // console.log(todoItem)
  }
  const handleDeleteTodoItem = (id) => {
    setTodoItem(todoItem.filter(item => {
      return item.id !== id
    }))
  }
  const handleEditInputChange = (event) => {
    setEditValue(event.target.value)
  }
  const handleEditTodoItem = (id) => {
    setTodoItem(todoItem.map(item => {
      if (item.state) return item
      if (item.id !== id) {
        return {
          ...item,
          edit: false,
          content: item.content
        }
      }
      return {
        ...item,
        edit: !item.edit,
        content: editValue.length === 0 ? item.content : editValue
      }
    }))
    setEditValue('')
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
                  defaultChecked={item.state}
                  onClick={() => handleTodoState(item.id)}
                />
                <button
                  className='todo-item-button'
                  onClick={() => handleDeleteTodoItem(item.id)}
                >
                  <AiFillDelete color='#E84855' size={20} />
                </button>
                <button
                  className='todo-item-button'
                  onClick={() => handleEditTodoItem(item.id)}
                >
                  <AiOutlineEdit color='#87833b' size={20} />
                </button>
                {
                  !item.edit
                    ? <span className={item.state ? 'todo-item-content-done' : ''}>
                      {item.content}
                    </span>
                    : <input
                      type='text'
                      maxLength='30'
                      className='todo-item-edit'
                      placeholder={item.content}
                      onChange={handleEditInputChange}
                      autoFocus
                    />
                }
              </div>
            </li>
          )
        })
      }
    </>
  )
}

export default TodosItem
