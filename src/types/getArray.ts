import { ARRAY } from "./getValue.interface"

const splitNotEscaped = (str: string): Array<string> => {
  const result = []
  let current = ""
  let backslashCount = 0

  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    if (char === "\\") {
      backslashCount++
      current += char
      continue
    }

    if (char === ",") {
      const isEscaped = backslashCount % 2 === 1

      if (!isEscaped) {
        result.push(current)
        current = ""
        backslashCount = 0
        continue
      }
    }

    current += char
    backslashCount = 0
  }

  result.push(current)
  return result
}

export const getArray = (value: string): Array<string> | null => {
    if (!value) {
        return null;
    }
    const split = splitNotEscaped(value);
    return split.length > 1 ? split : null;
}