import React from 'react'

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444'
      case 'medium': return '#ffaa00'
      case 'low': return '#00c851'
      default: return '#cccccc'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Sem data'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false
    return new Date(task.dueDate) < new Date()
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority === 'high' ? 'Alta' : 
             task.priority === 'medium' ? 'Média' : 'Baixa'}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className="task-date">
            Criada: {formatDate(task.createdAt)}
          </span>
          {task.dueDate && (
            <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
              Vence: {formatDate(task.dueDate)}
              {isOverdue() && ' ⚠️'}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="btn-edit"
          onClick={() => onEdit(task)}
          title="Editar tarefa"
        >
          ✏️
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Excluir tarefa"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskItem