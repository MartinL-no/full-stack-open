interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (inputArray: Array<number>, target: number): exerciseResult => {
  const periodLength = inputArray.length;
  const trainingDays = inputArray.filter(i => i > 0).length;
  const average = inputArray.reduce((a, b) => a + b, 0) / inputArray.length;
  const success = average > target ? true : false
  const rating = average < target 
    ? 1
    : average > (target + 3)
    ? 3
    : 2
  const ratingDescription = success ? 'good job!' : 'not too bad but could be better'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] , 2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
