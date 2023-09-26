// eslint-disable-next-line semi
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
interface BMIQuery {
  height: number;
  weight: number;
}
// eslint-disable-next-line semi
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello full stack");
});
app.get("/bmi", (_req, res) => {
  const { height, weight } = _req.query as unknown as BMIQuery;
  try {
    const result = calculateBmi(height, weight);
    res.json({ result });
  } catch (error) {
    res.json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (!_req.body) {
    return res.status(400).json({ error: "Request body is empty" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;
  if (daily_exercises === undefined || target === undefined) {
    return res.json({ error: "parameters missing" });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.json({ result });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ error: error.message });
    }
    return res.json(error);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
