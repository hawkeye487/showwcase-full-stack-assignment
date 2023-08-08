import express from "express";
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());

app.get('/api/getUniversity', async (req, res) => {
  const { name } = req.query;
  const apiUrl = `http://universities.hipolabs.com/search?name=${name}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
