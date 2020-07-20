import { YoutubeItem } from "../../types";

const knapsack = (list: YoutubeItem[], weight: number): YoutubeItem[] => {
  const result = [];
  let accumulatedWeight = 0;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < list.length; index++) {
    const element = list[index];

    if (element.seconds <= weight && accumulatedWeight + weight <= weight) {
      accumulatedWeight += element.seconds;
      result.push(element);
    }
  }

  return result;
};

export default knapsack;
