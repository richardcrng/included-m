export const indexVals = (arr: string[]): Record<string, true> => arr.reduce(
  (acc, val) => {
    acc[val] = true
    return acc
  },
  {} as Record<string, true>
)

export const numericKeys = <T>(arr: T[]): Record<string, T> => arr.reduce(
  (acc, val, idx) => {
    acc[String(idx)] = val
    return acc
  },
  {} as Record<string, T>
)