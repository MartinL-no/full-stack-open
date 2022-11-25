type Result = string;

interface BmiValues {
  cm: number,
  kgs: number,
}

const calculateBmi = (cm: number, kgs: number): Result => {
  const BMI = (kgs / Math.pow(cm, 2)) * 10000;

  if (BMI < 18.5) {
    return "Overweight";
  } else if (BMI > 24.9) {
    return "Underweight";
  }
  return "Normal (healthy weight)";
};

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      cm: Number(args[0]),
      kgs: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { cm, kgs } = parseBmiArguments(process.argv.slice(2));

  console.log(calculateBmi(cm, kgs));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;