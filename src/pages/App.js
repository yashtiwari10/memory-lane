import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { FaSun, FaMoon, FaEdit, FaTrash } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [theme, setTheme] = useState("light");
  const [memories, setMemories] = useState([]);
  const [input, setInput] = useState("");
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [filterMood, setFilterMood] = useState("All");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("memories"));
    if (saved) setMemories(saved);
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addMemory = () => {
    if (input.trim() === "") return;

    const newMemory = {
      text: input,
      mood: selectedMood,
      date: new Date().toLocaleString(),
    };

    if (editingIndex !== null) {
      const updatedMemories = [...memories];
      updatedMemories[editingIndex] = newMemory;
      setMemories(updatedMemories);
      setEditingIndex(null);
    } else {
      setMemories([...memories, newMemory]);
    }
    setInput("");
  };

  const deleteMemory = (idx) => {
    const updated = memories.filter((_, index) => index !== idx);
    setMemories(updated);
  };

  const editMemory = (idx) => {
    setInput(memories[idx].text);
    setSelectedMood(memories[idx].mood);
    setEditingIndex(idx);
  };

  const filteredMemories =
    filterMood === "All"
      ? memories
      : memories.filter((m) => m.mood === filterMood);

  const data = {
    labels: ["Happy", "Neutral", "Sad"],
    datasets: [
      {
        label: "Mood Count",
        data: [
          memories.filter((m) => m.mood === "Happy").length,
          memories.filter((m) => m.mood === "Neutral").length,
          memories.filter((m) => m.mood === "Sad").length,
        ],
        backgroundColor: ["#4caf50", "#ffc107", "#f44336"],
      },
    ],
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>Memory Lane</h1>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </header>

      <div className="memory-input">
        <input
          type="text"
          placeholder="Write something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>
        <button onClick={addMemory}>
          {editingIndex !== null ? "Update Memory" : "Add Memory"}
        </button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilterMood("All")}>All</button>
        <button onClick={() => setFilterMood("Happy")}>Happy</button>
        <button onClick={() => setFilterMood("Neutral")}>Neutral</button>
        <button onClick={() => setFilterMood("Sad")}>Sad</button>
      </div>

      <div className="timeline">
        {filteredMemories.length === 0 && <p>No memories yet.</p>}
        {filteredMemories.map((m, idx) => (
          <div className="memory-card" key={idx}>
            <div>
              <p>{m.text}</p>
              <small>{m.date}</small>
            </div>
            <div className="memory-actions">
              <span className={`mood-tag ${m.mood.toLowerCase()}`}>{m.mood}</span>
              <button onClick={() => editMemory(idx)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteMemory(idx)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h2>Mood Tracker</h2>
        <Bar data={data} />
      </div>

      <div className="features-container">
        <h2>What You Can Do Here</h2>
        <ul>
          <li>Add a memory with your current mood (Happy, Neutral, Sad).</li>
          <li>Edit or delete existing memories.</li>
          <li>Filter memories by mood.</li>
          <li>See when each memory was added (date & time).</li>
          <li>Track your overall mood trends with a bar chart.</li>
          <li>Toggle between light and dark theme for better viewing.</li>
          <li>Memories are saved in your browser automatically.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
