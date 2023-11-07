import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [newTask, setNewTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load tasks from local storage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent adding empty tasks
    if (editIndex !== null) {
      // If an item is being edited, update the existing tasks
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setNewTask("");
      setEditIndex(null);
    } else {
      // If not editing, add a new tasks
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="rectangle">
          <h1 className="text">My Todo App</h1>

          <div>
            <input
              type="text"
              placeholder="Add your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div>
            <button className="Input-button" onClick={addTask}>
              {editIndex !== null ? "Edit Task" : "Add Task"}
            </button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <p> </p>
                <button className="Edit-Button" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button
                  className="Delete-Button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
