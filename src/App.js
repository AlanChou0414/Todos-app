import React, { useState, useEffect } from 'react'
import TodosItem from './components/TodosItem'
import './style.css'
import { RiSendPlaneFill } from 'react-icons/ri'
import { v4 as uuid } from 'uuid'

const Todo = () => {
  const [inputValue, setInputValue] = useState('')
  const [isComposing, setIsComposing] = useState(null)
  const [todoItem, setTodoItem] = useState(() => {
    let localStorageData = localStorage.getItem('todoItem') || 0
    if (localStorageData) {
      localStorageData = JSON.parse(localStorageData)
    }
    if (!localStorageData) {
      return []
    }
    return localStorageData
  })

  useEffect(() => {
    localStorage.setItem('todoItem', JSON.stringify(todoItem))
  }, [todoItem])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleTodoItem = () => {
    if (inputValue === '') return ''
    setTodoItem([{
      id: uuid(Date()),
      state: false,
      edit: false,
      content: inputValue
    }, ...todoItem])
    setInputValue('')
  }
  const handleCompositionStart = () => {
    setIsComposing(true)
  }
  const handleCompositionEnd = (event) => {
    setIsComposing(false)
    if (event.target.value) {
      handleTodoItem()
      setInputValue('')
    }
  }
  const handleInputEnter = (event) => {
    if (event.key === 'Enter' && !isComposing) {
      handleTodoItem()
      setInputValue('')
    }
  }

  return (
    <>
      <div className='container'>
        <div className="inner">
          <header>
            <h1 className='title'>todos</h1>
          </header>
          <div className='form-container'>
            <input
              className='input-text'
              type="text"
              name='title'
              placeholder='Add todo...'
              value={inputValue}
              maxLength='30'
              onChange={handleInputChange}
              onKeyDown={handleInputEnter}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
            <button
              type='submit'
              className='input-submit'
              onClick={handleTodoItem}
            >
              <RiSendPlaneFill color='#2EC4B6' size={25} />
            </button>
          </div>
          <ul>
            {todoItem.length === 0
              ? <></>
              : <TodosItem todoItem={todoItem} setTodoItem={setTodoItem} />
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Todo
