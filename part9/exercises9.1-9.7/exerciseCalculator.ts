import { isNotNumber } from "./utils/helpers";

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (props: Array<string | number>, target: number): Result => {
  const data = props.map((item, _index) => {
    return Number(item);
  });

  if (data.length < 7 || !isNotNumber(Number(target))) {
    throw new Error("malformatted parameters");
  }

  const periodLength = data.length;
  const trainingDays = data.filter((e) => e !== 0).length;
  // const success = data.includes(0) ? false : true;
  const success = data.length > 0 && data.includes(0) ? false : true
  const average = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 7;
  let rating = 1;
  let ratingDescription = "not too bad but could be better";

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  const result: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
  return result;
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));


