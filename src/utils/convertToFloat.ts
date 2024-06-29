export function convertNumber(number: number | string) {
  let numStr = number.toString();
  let result = numStr.slice(0, -2) + "." + numStr.slice(-2);
  return parseFloat(result);
}
