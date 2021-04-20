export const getDaysFromNow = (date) => {
  const now = new Date();
  const daysFromNow = Math.round((date - now) / (24 * 60 * 60 * 1000));
  return daysFromNow;
}

export const padZero = (number) => {
  if (number < 10) return `0${number}`;
  else return number;
}