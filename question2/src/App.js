import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numberArray = input
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    try {
      const response = await fetch('http://localhost:3000/average', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numbers: numberArray })
      });

      const data = await response.json();

      if (response.ok) {
        setAverage(data.average);
        setError('');
      } else {
        setAverage(null);
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setAverage(null);
      setError('Server error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Average Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Calculate</button>
      </form>
      {average !== null && <p>Average: {average}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
