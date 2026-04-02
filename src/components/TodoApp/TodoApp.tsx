import { useTodos } from '../../hooks/useTodos'
import TodoInput from '../TodoInput/TodoInput'
import TodoList from '../TodoList/TodoList'
import TodoFooter from '../TodoFooter/TodoFooter'
import './TodoApp.css'

export default function TodoApp() {
  const {
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
  } = useTodos()

  const allCompleted = todos.length > 0 && todos.every(t => t.completed)

  return (
    <main className="todo-app">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>

      <div className="todo-app__card">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasItems={todos.length > 0}
          allCompleted={allCompleted}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          </>
        )}
      </div>

      {todos.length === 0 && (
        <p className="todo-app__hint">할 일을 입력하고 Enter 키를 눌러 추가하세요</p>
      )}
    </main>
  )
}
