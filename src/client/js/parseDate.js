export const parseDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(str => parseInt(str, 10));
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}