import React, { useState } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'dueDate':
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31')
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <h3>Nenhuma tarefa encontrada</h3>
          <p>Comece adicionando sua primeira tarefa!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list-container">
      <div className="list-controls">
        <div className="filter-group">
          <label>Filtrar:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Ordenar por:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="createdAt">Data de Criação</option>
            <option value="title">Título</option>
            <option value="priority">Prioridade</option>
            <option value="dueDate">Data de Vencimento</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="empty-filter">
          <p>Nenhuma tarefa encontrada com o filtro selecionado.</p>
        </div>
      )}
    </div>
  )
}

export default TaskList