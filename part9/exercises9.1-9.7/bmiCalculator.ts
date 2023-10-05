import { isNotNumber } from "./utils/helpers";

export function calculateBmi(heightCm: string |number, weightKg: string |number): string {
  if (isNotNumber(heightCm) || isNotNumber(weightKg)) {
    throw new Error("wrong type of height or weight");
  }
  const heightM = Number(heightCm) / 100;
  const bmi = Number(weightKg) / (heightM * heightM);
  if (bmi < 18.5) {
    return `Your BMI is ${bmi.toFixed(2)}. You are underweight.`;
  } else if (bmi < 24.9) {
    return `Your BMI is ${bmi.toFixed(2)}. Normal (healthy weight).`;
  } else if (bmi < 29.9) {
    return `Your BMI is ${bmi.toFixed(2)}. You are overweight.`;
  } else {
    return `Your BMI is ${bmi.toFixed(2)}. You are obese.`;
  }
}

// try {
//   const result = calculateBmi(process.argv[2], process.argv[3]);
//   console.log(result);
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }
