type Result = string;

interface BmiValues {
  cm: number,
  kgs: number,
}

const calculateBmi = (cm: number, kgs: number): Result => {
  const BMI = (kgs / Math.pow(cm, 2)) * 10000

  if (BMI < 18.5) {
    return "Overweight"
  } else if (BMI > 24.9) {
    return "Underweight"
  }
  return "Normal (healthy weight)"
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      kgs: Number(args[3])
    } 
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { cm, kgs } = parseBmiArguments(process.argv)

  console.log(calculateBmi(cm, kgs));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
