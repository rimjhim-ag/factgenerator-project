import React, { useState, useEffect } from "react";
import "./App.css";

function FactDisplay({ fact, onCopy }) {
  return (
    <div className="fact-box">
      <p>{fact}</p>
      <button onClick={onCopy} className="copy-btn">📋 Copy</button>
    </div>
  );
}

function App() {
  const [fact, setFact] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setFact(data.fact);
      setHistory((prev) => [data.fact, ...prev.slice(0, 4)]); // keep last 5 facts
    } catch (err) {
      setError("Could not load cat fact 😿");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fact);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <h1>🐱 Cat Fact Generator</h1>
      <button onClick={fetchCatFact} className="button">
        {loading ? "Loading..." : "New Cat Fact"}
      </button>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      {error && <p className="error">{error}</p>}
      {!error && fact && <FactDisplay fact={fact} onCopy={copyToClipboard} />}
      <h2>📜 Previous Facts</h2>
      <ul>
        {history.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
