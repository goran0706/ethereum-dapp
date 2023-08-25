export function commafy(number: number | bigint | string): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
