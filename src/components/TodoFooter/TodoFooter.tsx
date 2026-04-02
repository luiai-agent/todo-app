import type { FilterType } from '../../types'
import './TodoFooter.css'

interface TodoFooterProps {
  activeCount: number
  completedCount: number
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '미완료' },
  { value: 'completed', label: '완료' },
]

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <footer className="todo-footer">
      <span className="todo-footer__count" aria-live="polite" aria-atomic="true">
        <strong>{activeCount}</strong>개 남음
      </span>

      <nav className="todo-footer__filters" aria-label="필터">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`todo-footer__filter-btn ${filter === f.value ? 'todo-footer__filter-btn--active' : ''}`}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {completedCount > 0 && (
        <button
          className="todo-footer__clear"
          onClick={onClearCompleted}
        >
          완료 삭제 ({completedCount})
        </button>
      )}
    </footer>
  )
}
