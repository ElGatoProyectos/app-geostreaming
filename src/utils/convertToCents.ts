export function convertToCents(value: number | string) {
  const formatedString = value.toString();
  return Math.round(parseFloat(formatedString) * 100);
}
