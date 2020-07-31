import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import { YoutubeItem } from "../../types";

export interface Sort extends YoutubeItem {
  sort: number;
}

// helper function to swap values around
const swap = (list: ArrayList<Sort>, leftIndex: number, rightIndex: number) => {
  const temp = list.at(leftIndex);
  list.set(leftIndex, list.at(rightIndex));
  list.set(rightIndex, temp);
};

// Partition the array list into sub array lists
const partition = (list: ArrayList<Sort>, left: number, right: number) => {
  const pivot = list.at(Math.floor((left + right) / 2)).sort;
  let leftIndex = left;
  let rightIndex = right;

  while (leftIndex <= rightIndex) {
    while (list.at(leftIndex).sort < pivot) {
      leftIndex++;
    }

    while (list.at(rightIndex).sort > pivot) {
      rightIndex--;
    }

    // Commented out for now, seems to evaluate true every time
    // if (leftIndex <= rightIndex) {
    swap(list, leftIndex, rightIndex);
    leftIndex++;
    rightIndex--;
    // }
  }
  return leftIndex;
};

/**
 * Actual sorting happens in this recursive function
 * @param list ArrayList<Sort>
 * @param left number
 * @param right number
 */
const quicksortRecursive = (
  list: ArrayList<Sort>,
  left: number,
  right: number
): ArrayList<Sort> => {
  if (list.size()) {
    const index = partition(list, left, right);
    if (index < right) {
      return quicksortRecursive(list, index, right);
    }

    if (left < index - 1) {
      return quicksortRecursive(list, left, index - 1);
    }
  }

  return list;
};

/**
 * Quicksort algorithm. Accepts YoutubeItem type, which has been extended to accept sort key for sorting
 * Time complexity O(n log n)
 * Space complexity O(n)
 * @param list ArrayList<Sort>
 */
const quicksort = (list: ArrayList<Sort>): ArrayList<Sort> => {
  // to prevent in-place sorting, create new array with the same data
  // new array will then be used instead of the original array
  const newList = new ArrayList<Sort>(list.size());
  for (let i = 0; i < list.size(); i++) {
    newList.push(list.at(i));
  }

  return quicksortRecursive(newList, 0, newList.size() - 1);
};

export default quicksort;
