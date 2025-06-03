import React, { useState } from 'react';
import './App.css';

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🐱 Random Cat Fact</h1>
      <button onClick={fetchCatFact} className="button">
        {loading ? 'Loading...' : 'Get Cat Fact'}
      </button>
      {error && <p className="error">{error}</p>}
      {!error && fact && <p className="fact">{fact}</p>}
    </div>
  );
}

export default App;
