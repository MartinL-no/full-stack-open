import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted parameters');
    }

    res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    
    res.send({ error: (error as Error).message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});