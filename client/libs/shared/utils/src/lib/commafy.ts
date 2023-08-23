export function commafy(number: number | bigint): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
