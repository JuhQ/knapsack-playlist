import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";

const recursiveKnapsack = (
  list: YoutubeItem[],
  maxLength: number,
  index: number
): YoutubeItem[] => {
  if (index === -1) {
    return [];
  }

  const nextVideoWithSameLength = recursiveKnapsack(list, maxLength, index - 1);
  if (maxLength < list[index].seconds) {
    return nextVideoWithSameLength;
  }

  const nextVideoWithSmallerLength = recursiveKnapsack(
    list,
    maxLength - list[index].seconds,
    index - 1
  );

  return sumSeconds(nextVideoWithSameLength) >
    sumSeconds(nextVideoWithSmallerLength)
    ? nextVideoWithSameLength
    : [...nextVideoWithSmallerLength, list[index]];
};

const knapsack = (list: YoutubeItem[], maxLength: number): YoutubeItem[] => {
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
