import {v4} from 'uuid'

export const generateUnique: (arr: string[]) => string
  = (arr) => {
    let generated
    do {
      generated = v4()
    } while (
      arr.includes(generated)
    )

      return generated
  }