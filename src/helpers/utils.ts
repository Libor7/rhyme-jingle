/** MODELS */
import { Operator } from "models/common";
import { MINIMAL_STRING_LENGTH_SEARCH } from "models/constants";

export const containsWordOfLength = (
  words: string[],
  length: number,
  operator: Operator
) => words.some((word) => compareWordLength(word, length, operator));

export const compareWordLength = (
  word: string,
  length: number,
  operator: Operator
) => {
  switch (operator) {
    case Operator.EQUAL:
      return word.length === length;
    case Operator.GREATER:
      return word.length > length;
    case Operator.GREATER_OR_EQUAL:
      return word.length >= length;
  }
};

export const convertWordsToTheirLengths = (words: string[]) =>
  words.map((word) => word.length);

export const filterByText = (
  words: string[],
  text: string,
  minLength: number = MINIMAL_STRING_LENGTH_SEARCH
) =>
  text.length < minLength
    ? []
    : words.filter(
        (word) =>
          word
            .toLowerCase()
            .slice(-text.length)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") ===
          text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
      );

export const filterByTextLength = (words: string[], lengths: number[]) =>
  words.filter((word) => lengths.indexOf(word.length) >= 0);

export const filterOutSubset = (words: string[], subset: string[]) =>
  words.filter((word) => subset.indexOf(word) === -1);

export const getCurrentPageWords = (
  words: string[],
  from: number,
  to: number
) => words.slice(from, to);

export const getLocalStorageValue = <T>(key: string, initialValue: T): T =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));

export const getReducedArray = <T>(arr: T[], amount: number) =>
  arr.filter((_val, i) => i < amount);

export const hasArrayElement = <T>(arr: T[], elem: T) => arr.indexOf(elem) >= 0;

export const removeDuplicates = <T>(arr: T[]) => Array.from(new Set(arr));

export const removeItemFromArray = <T>(arr: T[], elem: T) =>
  arr.filter((item) => item !== elem);

export const sortByNumberASC = (numA: number, numB: number) =>
  numA > numB ? 1 : -1;
