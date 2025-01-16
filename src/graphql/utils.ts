export const captialize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const join = (array: Array<string>) => {
  return array.join(' | ')
}
