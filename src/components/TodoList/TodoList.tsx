import type { Todo, FilterType } from '../../types'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'

interface TodoListProps {
  todos: Todo[]
  filter: FilterType
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const EMPTY_MESSAGES: Record<FilterType, string> = {
  all: '할 일이 없습니다',
  active: '미완료 항목이 없습니다',
  completed: '완료된 항목이 없습니다',
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list__empty" role="status">
        {EMPTY_MESSAGES[filter]}
      </div>
    )
  }

  return (
    <ul className="todo-list" role="list" aria-label="할 일 목록">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
