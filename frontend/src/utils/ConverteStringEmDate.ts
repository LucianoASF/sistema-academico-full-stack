export function stringToDate(dateEmString: string): Date {
  const [year, month, day] = dateEmString.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}
