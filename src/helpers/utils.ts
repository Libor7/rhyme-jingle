export const filterByText = (words: string[], text: string) =>
  words.filter((word) => word.slice(-text.length) === text);

export const filterByTextLength = (words: string[], lengthFilters: number[]) =>
  words.filter((word) => lengthFilters.indexOf(word.length) >= 0);

export const removeDuplicates = <T>(arr: T[]) => Array.from(new Set(arr));

export const sortByNumberASC = (numA: number, numB: number) =>
  numA > numB ? 1 : -1;

export const wordsToWordlengths = (words: string[]) =>
  words.map((word) => word.length);
