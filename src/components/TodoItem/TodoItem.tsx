import { useState, useEffect, useRef } from 'react'
import type { Todo } from '../../types'
import './TodoItem.css'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const commitEdit = () => {
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  const handleLabelDoubleClick = () => {
    setEditText(todo.text)
    setIsEditing(true)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''} ${isEditing ? 'todo-item--editing' : ''}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-item__edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={commitEdit}
          aria-label="할 일 수정"
        />
      ) : (
        <div className="todo-item__view">
          <input
            id={`todo-${todo.id}`}
            className="todo-item__checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            aria-label={`${todo.text} ${todo.completed ? '완료됨' : '미완료'}`}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className="todo-item__label"
            onDoubleClick={handleLabelDoubleClick}
            title="더블클릭으로 수정"
          >
            {todo.text}
          </label>
          <button
            className="todo-item__delete"
            onClick={() => onDelete(todo.id)}
            aria-label={`"${todo.text}" 삭제`}
            title="삭제"
          >
            &times;
          </button>
        </div>
      )}
    </li>
  )
}
