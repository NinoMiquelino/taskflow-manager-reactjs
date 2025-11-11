import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { saveTasks, loadTasks } from './utils/storage'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const savedTasks = loadTasks()
    setTasks(savedTasks)
  }, [])

  // Salvar tarefas no localStorage sempre que houver mudança
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (taskData) => {
    if (editingTask) {
      // Editar tarefa existente
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ))
      setEditingTask(null)
    } else {
      // Adicionar nova tarefa
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setTasks([...tasks, newTask])
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ))
  }

  const startEditing = (task) => {
    setEditingTask(task)
  }

  const cancelEditing = () => {
    setEditingTask(null)
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }

  const stats = getTaskStats()

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total</h3>
              <span className="stat-number">{stats.total}</span>
            </div>
            <div className="stat-card">
              <h3>Concluídas</h3>
              <span className="stat-number completed">{stats.completed}</span>
            </div>
            <div className="stat-card">
              <h3>Pendentes</h3>
              <span className="stat-number pending">{stats.pending}</span>
            </div>
          </div>

          <TaskForm 
            onSubmit={addTask}
            editingTask={editingTask}
            onCancel={cancelEditing}
          />

          <TaskList 
            tasks={tasks}
            onDelete={deleteTask}
            onToggleComplete={toggleTaskCompletion}
            onEdit={startEditing}
          />
        </div>
      </main>
    </div>
  )
}

export default App