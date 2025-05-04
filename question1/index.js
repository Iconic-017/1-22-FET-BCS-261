const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON body

// POST route to calculate average
app.post('/average', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Invalid input. Provide an array of numbers.' });
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  return res.json({ average });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
