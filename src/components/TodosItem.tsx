import React, { useState } from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDone } from 'react-icons/md'

// Type
import { TodoItemType } from '../type'

const TodosItem = ({ todoItem, setTodoItem }) => {
  const [editValue, setEditValue] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const handleTodoState = (id: string | number) => {
    setTodoItem(todoItem.map((item: TodoItemType) => {
      if (item.id !== id) return item
      return {
        ...item,
        state: !item.state
      }
    }))
  }
  const handleDeleteTodoItem = (id: string | number, content: string) => {
    if (confirm(`Are you sure you want to delete the To-Do : ${content} ?`)) {
      setTodoItem(todoItem.filter((item: TodoItemType) => {
        return item.id !== id
      }))
    }
  }
  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value)
  }
  const handleEditTodoItem = (id: string | number) => {
    if (isEditing) return
    setIsEditing(true)
    setTodoItem(todoItem.map((item: TodoItemType) => {
      if (item.id !== id) {
        return {
          ...item,
          edit: false
        }
      }
      return {
        ...item,
        edit: true
      }
    }))
  }
  const handleCompletedEdit = (id: string | number) => {
    setTodoItem(todoItem.map((item: TodoItemType) => {
      if (item.id !== id) {
        return item
      }
      return {
        ...item,
        edit: false,
        content: editValue.length === 0 ? item.content : editValue
      }
    }))
    setEditValue('')
    setIsEditing(false)
  }
  const handelEditInputKeyDown = (event: React.KeyboardEvent, id: string | number) => {
    event.key === 'Enter' && handleCompletedEdit(id)
  }
  return (
    <>
      {
        todoItem.map((item: TodoItemType) => {
          return (
            <li
              className='todo-item'
              key={item.id}
            >
              <div>
                <input
                  className='todo-item-checkbox'
                  type="checkbox"
                  disabled={item.edit}
                  checked={item.state}
                  readOnly={true}
                  onClick={() => handleTodoState(item.id)}
                />
                <button
                  className='todo-item-button'
                  onClick={() => handleDeleteTodoItem(item.id, item.content)}
                >
                  <AiFillDelete color='#E84855' size={20} />
                </button>
                {
                  !item.edit
                    ? <>
                      <span className={item.state ? 'todo-item-content-done' : ''}>
                        {item.content}
                      </span>
                      {
                        !item.state
                          ? <button
                            className='todo-item-button'
                            onClick={() => handleEditTodoItem(item.id)}
                          >
                            <AiOutlineEdit color='#87833b' size={20} />
                          </button>
                          : <></>
                      }
                    </>
                    : <>
                      <input
                        type='text'
                        maxLength={30}
                        className='todo-item-edit'
                        placeholder={item.content}
                        onChange={handleEditInputChange}
                        onKeyDown={(event) => handelEditInputKeyDown(event, item.id)}
                        autoFocus
                      />
                      <button
                        className='todo-item-button'
                        onClick={() => handleCompletedEdit(item.id)}
                      >
                        <MdOutlineDone color='green' size={20} />
                      </button>
                    </>
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
