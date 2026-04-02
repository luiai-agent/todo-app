import { useState } from 'react'
import './TodoInput.css'

interface TodoInputProps {
  onAdd: (text: string) => void
  onToggleAll: () => void
  hasItems: boolean
  allCompleted: boolean
}

export default function TodoInput({ onAdd, onToggleAll, hasItems, allCompleted }: TodoInputProps) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const trimmed = value.trim()
      if (trimmed) {
        onAdd(trimmed)
        setValue('')
      }
    }
  }

  return (
    <div className="todo-input">
      {hasItems && (
        <button
          className={`todo-input__toggle-all ${allCompleted ? 'todo-input__toggle-all--active' : ''}`}
          onClick={onToggleAll}
          aria-label="모든 항목 완료/미완료 전환"
          title="모두 전환"
        >
          &#x2304;
        </button>
      )}
      <input
        className="todo-input__field"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        aria-label="새 할 일 입력"
        autoFocus
      />
    </div>
  )
}
