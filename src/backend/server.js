import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/country/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching country information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
