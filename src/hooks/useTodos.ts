import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Todo, FilterType } from '../types'

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo-app:todos', [])
  const [filter, setFilter] = useLocalStorage<FilterType>('todo-app:filter', 'all')

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeCount = useMemo(() => todos.filter(t => !t.completed).length, [todos])
  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos])

  const addTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: trimmed } : t))
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed)
    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })))
  }

  return {
    todos,
    filter,
    filteredTodos,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    clearCompleted,
    toggleAll,
  }
}
