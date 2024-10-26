import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { AiTwotoneDelete } from "react-icons/ai";
import './App.css';

const API_URL = 'https://todo-backend-occm.onrender.com/tasks'

function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [message, setMessage] = useState('')

  // Fetch tasks from backend 

  useEffect(() => {
    fetchTasks()
  }, [])


  const fetchTasks = async () => {
    const response = await axios.get(API_URL)
    setTasks(response.data)
  }

  const addTask = async () => {
    if (!newTask) {
      setMessage('Task title cannot be empty!')
      setTimeout(() => setMessage(''), 2000)
      return
    }
    await axios.post(API_URL, {title: newTask})
    setNewTask('')
    fetchTasks()
  }

  const updateTask = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, {completed: !completed})
    fetchTasks()
  }

  const updateTaskText = async (id, updatedTitle) => {
    await axios.put(`${API_URL}/${id}`, {title: updatedTitle})
    fetchTasks()
  }

  const deleteTask = async(id) => {
    await axios.delete(`${API_URL}/${id}`)
    fetchTasks()
  }


  return (
    <div className="App">
      <div className='header-section'>
        <img className="logo" src="https://culturelinkr.com/logo.png" alt="CultureLinkr Logo" />
        <h3>CultureLinkr</h3>
      </div>
      <div className='input-container'>
        <input 
          className='input'
          type = "text"
          placeholder='Add Item'
          value = {newTask}
          onChange = {(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask()
            }
          }}
        />
        <button className='input-button' onClick = {addTask}>+</button>
      </div>
      {message && (
        <p className='message'>{message}</p>
      )}
      <ul className='tasks-container'>
        <p className='Todo-text'>TO DO</p>
        {tasks.map((task) => (
          <li key = {task._id} className='list-task-section'>
            <div className='task-section'>
              <input 
                className = "checkbox"
                type = "checkbox"
                value = {task.completed}
                onChange={() => updateTask(task._id, task.completed)}
              />
              <input 
                className='task-container'
                type = "text"
                value = {task.title}
                onChange = {(e) => updateTaskText(task._id, e.target.value)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'text',
                }}
              />
            </div>
            <button className = 'delete-button' onClick={() => deleteTask(task._id)}>
              <AiTwotoneDelete className='delete-icon'/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
