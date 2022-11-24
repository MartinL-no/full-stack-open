type Result = string;

const calculateBmi = (cm: number, kgs: number): Result => {
  const BMI = (kgs / Math.pow(cm, 2)) * 10000

  if (BMI > 18.5 || BMI < 24.9) {
    return "Normal (healthy weight)"
  }

  return "Out of range (unhealthy weight)"
}

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
