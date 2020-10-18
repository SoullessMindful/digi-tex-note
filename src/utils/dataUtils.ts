export const setArrayMember: <T>(arr: T[], newVal: T, i: number) => T[]
  = (arr, newVal, i) => arr.map((val, j) => i === j ? newVal : val )

export const addArrayMember: <T>(arr: T[], val: T, i?: number) => T[]
  = (arr, val, i) => i === undefined ?
  [...arr, val] :
  [
    ...arr.filter((_, j) => j < i),
    val,
    ...arr.filter((_, j) => j >= i)
  ]

export const deleteArrayMember: <T>(arr: T[], i: number) => T[]
  = (arr, i) => arr.filter((_, j) => i !== j)
