export function capFirstLetter(str:string):string {
  const firstLetter = str.charAt(0)

  const firstLetterCap = firstLetter.toUpperCase()

  const remainingLetters = str.slice(1)

  return firstLetterCap + remainingLetters
}

export function shuffleArray(array:unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function removeElementAtIndex<T>(array: T[], index: number): T[] {
  if (index >= 0 && index < array.length) {
      array.splice(index, 1);
  }
  return array;
}