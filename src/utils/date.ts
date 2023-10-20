export function isInputDateMoreThanSpecifiedMinutesPastCurrentDate(
  inputDate: Date,
  minutes: number
): boolean {
  const currentDate = new Date();
  const minutesInMilliseconds = minutes * 60 * 1000;

  return currentDate.getTime() - inputDate.getTime() > minutesInMilliseconds;
}
