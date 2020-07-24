import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";

/**
 * The actual recursive implementation of the algorithm
 * @param list array of object
 * @param maxLength number
 * @param index number
 */
const recursiveKnapsack = (
  list: YoutubeItem[],
  maxLength: number,
  index: number
): YoutubeItem[] => {
  if (index === -1) {
    return [];
  }

  const currentVideo = list[index];
  const nextVideoWithSameLength = recursiveKnapsack(list, maxLength, index - 1);

  if (maxLength < currentVideo.seconds) {
    return nextVideoWithSameLength;
  }

  const nextVideoWithSmallerLength = recursiveKnapsack(
    list,
    maxLength - currentVideo.seconds,
    index - 1
  );

  return sumSeconds(nextVideoWithSameLength) >
    sumSeconds(nextVideoWithSmallerLength)
    ? nextVideoWithSameLength
    : [...nextVideoWithSmallerLength, currentVideo];
};

/**
 * Knapsack algorithm.
 * This is an recursive implementation of the algorithm, which will call itself until maximum size of the list is reached
 * @param list array of objects with following data structure: {id: string, title: string, seconds: number}
 * @param maxLength number
 */
const knapsack = (list: YoutubeItem[], maxLength: number): YoutubeItem[] => {
  // if no values given, return empty list immediately
  if (maxLength <= 0 || list.length === 0) {
    return [];
  }

  // if the given list already fits into the desired playlist length, just return the list
  if (sumSeconds(list) <= maxLength) {
    return list;
  }

  return recursiveKnapsack(list, maxLength, list.length - 1);
};

export default knapsack;
