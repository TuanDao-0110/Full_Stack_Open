import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();
interface BMIQuery {
  height: number;
  weight: number;
}
app.get("/hello", (_req, res) => {
  res.send("Hello full stack");
});
app.get("/bmi", async (_req, res) => {
  const { height, weight } = _req.query as unknown as BMIQuery;
  try {
    const result = calculateBmi(height, weight);
    res.json({ result });
  } catch (error) {
    res.json({ error: "malformatted parameters" });
  }
});

app.post('/calculate', async (_req, res) => {
    
})
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
