import express from 'express';
import calculateBmi from './calculateBmi';
import { calculateExercises, parseArguments } from './calculateExercises';

const app = express();
app.use(express.json());   

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const DAILY_EXERCISES_WITH_TARGET_ADDED: Array<string> = [req.body.target, ...req.body.daily_exercises];

  if (DAILY_EXERCISES_WITH_TARGET_ADDED.length < 8 || DAILY_EXERCISES_WITH_TARGET_ADDED.length > 8) {
    return res.send({ body: { error: "parameters missing" }});
  }

  try {
    const PARSED_ARGUMENTS = parseArguments(DAILY_EXERCISES_WITH_TARGET_ADDED);
    const RESULTS = calculateExercises(PARSED_ARGUMENTS);
    return res.send({ body: RESULTS });
  } catch {
    return res.send({ body: { error: "malformatted missing" }});
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});