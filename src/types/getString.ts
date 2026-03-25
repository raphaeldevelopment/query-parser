export const getString = (value: string): string => {
  return value
    .replace(/\\,/g, ",")
    .replace(/\\\\/g, "\\")
}