import Queue from "../../Datastructures/queue/queue";

/**
 * The recursive algorithm will call this algorithm to try to get the videos with the best ratings
 * The goal is to get a playlist which has rating as close to 5/5 as possible
 * @param list array of object
 * @param maxLength number
 * @param index number
 */
const recursiveKnapsackRating = (
  list: Queue,
  maxLength: number,
  index: number
): Queue => {
  if (index === -1) {
    return new Queue();
  }

  const currentVideo = list.at(index);
  const nextVideoWithSameLength = recursiveKnapsackRating(
    list,
    maxLength,
    index - 1
  );

  if (maxLength < currentVideo.seconds) {
    return nextVideoWithSameLength;
  }

  const nextVideoWithSmallerLength = recursiveKnapsackRating(
    list,
    maxLength - currentVideo.seconds,
    index - 1
  );

  nextVideoWithSmallerLength.enqueue(currentVideo);

  if (
    nextVideoWithSameLength.averageRating() >
    nextVideoWithSmallerLength.averageRating()
  ) {
    return nextVideoWithSameLength;
  }

  return nextVideoWithSmallerLength;
};

/**
 * The actual recursive implementation of the algorithm
 * @param list array of object
 * @param maxLength number
 * @param index number
 */
const recursiveKnapsack = (
  list: Queue,
  maxLength: number,
  index: number
): Queue => {
  if (index === -1) {
    return new Queue();
  }

  const currentVideo = list.at(index);
  const nextVideoWithSameLength = recursiveKnapsackRating(
    list,
    maxLength,
    index - 1
  );

  if (maxLength < currentVideo.seconds) {
    return nextVideoWithSameLength;
  }

  const nextVideoWithSmallerLength = recursiveKnapsackRating(
    list,
    maxLength - currentVideo.seconds,
    index - 1
  );

  nextVideoWithSmallerLength.enqueue(currentVideo);

  if (
    nextVideoWithSameLength.seconds() > nextVideoWithSmallerLength.seconds()
  ) {
    return nextVideoWithSameLength;
  }

  return nextVideoWithSmallerLength;
};

/**
 * Knapsack algorithm.
 * This is an recursive implementation of the algorithm, which will call itself until maximum size of the list is reached
 * @param list array of objects with following data structure: {id: string, title: string, seconds: number}
 * @param maxLength number
 */
const knapsack = (list: Queue, maxLength: number): Queue => {
  const queue = new Queue();
  const listLength = list.length();

  // if no values given, return empty list immediately
  if (maxLength <= 0 || listLength === 0) {
    return queue;
  }

  // if the given list already fits into the desired playlist length, just return the list
  if (list.seconds() <= maxLength) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < listLength; i++) {
      queue.enqueue(list.at(i));
    }

    return queue;
  }

  return recursiveKnapsack(list, maxLength, listLength - 1);
};

export default knapsack;
