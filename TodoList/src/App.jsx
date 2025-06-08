
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { Pie, Bar } from 'react-chartjs-2';
import notificationSound from './assets/pomodoro-done.mp3';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function App() {
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(25);
  const audio = new Audio(notificationSound);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      audio.play();
      alert("⏰ Time's up! Take a short break.");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setDeadline(t.deadline || "");
    setPriority(t.priority || "Medium");
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim().length > 3) {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false, createdAt: new Date().toISOString(), deadline, priority }];
      setTodos(newTodos);
      setTodo("");
      setDeadline("");
      setPriority("Medium");
      saveToLS(newTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const pendingCount = todos.length - completedCount;

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completedCount, pendingCount],
      backgroundColor: ['#10b981', '#f59e0b'],
      hoverOffset: 8
    }]
  };

  const getWeekStats = () => {
    const stats = Array(7).fill(0);
    const now = new Date();
    todos.forEach(todo => {
      if (todo.isCompleted && todo.createdAt) {
        const created = new Date(todo.createdAt);
        const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
        if (diff < 7) {
          stats[6 - diff]++;
        }
      }
    });
    return stats;
  };

  const weeklyStats = getWeekStats();
  const barData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Completed Tasks',
      data: weeklyStats,
      backgroundColor: '#6366f1'
    }]
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCustomPomodoro = () => {
    setSecondsLeft(customTime * 60);
    setIsRunning(false);
  };

  return (
    <>
      <Nav />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gradient-to-br from-violet-100 via-purple-200 to-pink-100 min-h-[80vh] md:w-[35%] transition-all duration-500">
        <h1 className='font-bold text-center text-3xl animate-pulse'>दिनचर्या - The Daily Flow</h1>

        <div className='my-5'>
          <input value={todo} onChange={handleChange} type="text" placeholder='Add a task...' className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none' />
          <input value={deadline} onChange={handleDeadlineChange} type="date" className='w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none' />
          <select value={priority} onChange={handlePriorityChange} className='w-full mt-2 px-3 py-2 rounded-lg border border-gray-300'>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleAdd} className='w-full mt-3 bg-green-500 text-white py-2 rounded-lg'>Add Task</button>
        </div>

        <div className="mb-4">
          <button onClick={toggleFinished} className="text-sm underline text-blue-600">
            {showFinished ? "Hide Completed" : "Show Completed"}
          </button>
        </div>

        <ul>
          {todos.filter(item => showFinished || !item.isCompleted).map(item => (
            <li key={item.id} className='flex justify-between items-center bg-white p-3 my-2 rounded-lg shadow'>
              <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckbox} />
              <span className={`flex-1 mx-3 ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>{item.todo}</span>
              <span className='text-xs text-gray-500'>{item.deadline}</span>
              <span className='text-xs px-2 py-1 rounded bg-purple-200 ml-2'>{item.priority}</span>
              <FaEdit className='mx-2 cursor-pointer text-blue-600' onClick={(e) => handleEdit(e, item.id)} />
              <AiFillDelete className='cursor-pointer text-red-600' onClick={(e) => handleDelete(e, item.id)} />
            </li>
          ))}
        </ul>

        <div className="my-10 bg-white p-4 rounded-xl shadow">
          <h2 className='text-lg font-semibold text-center mb-3'>Progress Overview</h2>
          <div className='flex flex-col items-center md:flex-row md:justify-around'>
            <div className='w-[200px]'><Pie data={chartData} /></div>
            <div className='w-[300px]'><Bar data={barData} /></div>
          </div>
        </div>

        <div className="pomodoro mt-10 bg-white p-5 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-3">Pomodoro Timer</h2>
          <div className="text-3xl font-mono mb-4 animate-pulse text-red-600">{formatTime(secondsLeft)}</div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="customTime" className='font-semibold'>Set Custom Time (minutes):</label>
            <input
              id="customTime"
              type="number"
              min="1"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="rounded-full px-4 py-2 border border-gray-300"
            />
            <button onClick={handleCustomPomodoro} className='bg-blue-500 text-white px-4 py-2 rounded-full'>Set Timer</button>
          </div>

          <div>
            <button onClick={() => setIsRunning(true)} className="bg-green-500 text-white px-4 py-2 rounded-full mx-2">Start</button>
            <button onClick={() => setIsRunning(false)} className="bg-yellow-500 text-white px-4 py-2 rounded-full mx-2">Pause</button>
            <button onClick={() => { setSecondsLeft(customTime * 60); setIsRunning(false); }} className="bg-red-500 text-white px-4 py-2 rounded-full mx-2">Reset</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
