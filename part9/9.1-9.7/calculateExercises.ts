interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

type inputValues  = Array<number>

const calculateExercises = (inputArray: Array<number>): exerciseResult => {
  const inputExerciseHours = inputArray.slice(1)
  const periodLength = inputExerciseHours.length;
  const trainingDays = inputExerciseHours.filter(i => i > 0).length;
  const average = inputExerciseHours.reduce((a, b) => a + b, 0) / inputExerciseHours.length;
  const success = average > inputArray[0] ? true : false
  const rating = average < inputArray[0] 
    ? 1
    : average > (inputExerciseHours[0] + 3)
    ? 3
    : 2
  const ratingDescription = success ? 'good job!' : 'not too bad but could be better'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: inputArray[0],
    average,
  }
}

const parseArguments = (args: Array<string>): inputValues => {
  if (args.length < 1) throw new Error('Not enough arguments');

  const validValues = args.find((_arg, index) => {
    return !isNaN(Number(args[index]))
  })

  if (validValues) {
    return args.map(arg => Number(arg))
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const consoleInputArray = parseArguments(process.argv.slice(2))

  console.log(calculateExercises(consoleInputArray));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}