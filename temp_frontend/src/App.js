import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import Login from "./pages/Login"
import TaskDetails from './components/TaskDetails'
import Dashboard from "./pages/Dashboard"
import Exercises from "./pages/Exercises"

function App() {
  const [user, setUser] = useState(null)
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromServer = await fetchTasks()
  //     setTasks(tasksFromServer)
  //   }

  //   getTasks()
  // }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    // const res = await fetch('http://localhost:5000/tasks')
    // Server proxy in temp_frontend package.json, because this endpoint is not on frontend port, request will go to proxy
    const res = await fetch('/api/goals/test')
    console.log(res)
    const data = await res.json()
    console.log(data);

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add task
  const addGoal = async (task) => {
    const res = await fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task))
  }




  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes >
          <Route path="/" element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/exercises' element={<Exercises />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
