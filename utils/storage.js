const STORAGE_KEY = 'taskManager_tasks'

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error)
  }
}

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
    return []
  }
}