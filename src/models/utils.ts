export const indexVals = (arr: string[]): Record<string, true> => arr.reduce(
  (acc, val) => {
    acc[val] = true
    return acc
  },
  {} as Record<string, true>
) 