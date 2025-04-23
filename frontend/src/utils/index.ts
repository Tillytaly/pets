export function generateRandomNumber(start: number, end: number) {
  // Ensure the start is less than or equal to end
  if (start > end) {
    throw new Error("Start number must be less than or equal to end number.");
  }
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
