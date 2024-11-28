import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Add or update a task
  const handleTaskSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    if (isEditing) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { title, description } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
    } else {
      setTasks([...tasks, { title, description }]);
    }
    setTitle("");
    setDescription("");
    setCurrentTaskIndex(null);
  };

  // Edit a task
  const editTask = (index) => {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>To-Do App</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          style={{ marginBottom: "10px", display: "block", width: "100%" }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          rows="3"
          style={{ marginBottom: "10px", display: "block", width: "100%" }}
        />
        <button onClick={handleTaskSubmit}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

