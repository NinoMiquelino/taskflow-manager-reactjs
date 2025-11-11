import React, { useState, useEffect } from 'react'

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.priority)
      setDueDate(editingTask.dueDate || '')
    } else {
      resetForm()
    }
  }, [editingTask])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Por favor, insira um título para a tarefa!')
      return
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null
    }

    onSubmit(taskData)
    resetForm()
  }

  return (
    <div className="task-form-container">
      <h2>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da tarefa..."
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição da tarefa..."
            rows="3"
            maxLength="500"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Prioridade</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Data de Vencimento</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-actions">
          {editingTask && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm