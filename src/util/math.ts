export function range(
  ...args: [end: number] | [start: number, end: number]
): number[] {
  const start = args.length === 2 ? args[0] : 0;
  const end = args.length === 2 ? args[1] : args[0];
  return [...Array(end - start)].map((empty, index) => index + start);
}

export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

export function mean(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}
