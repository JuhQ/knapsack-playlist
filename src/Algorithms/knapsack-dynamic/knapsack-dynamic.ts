/* eslint-disable no-continue */
import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";

type YoutubeOrNull = YoutubeItem | null;

/**
 * Dynamic programming version of the knapsack algorithm
 * Space and time complexities: O(nW)
 * @param list ArrayList<YoutubeItem>
 * @param maxLength number
 * @returns Queue
 */
function knapsackDynamic(
  list: ArrayList<YoutubeItem>,
  maxLength: number
): Queue {
  const listSize = list.size();

  // this list will be used to cache all the possibilities
  const cache = new ArrayList<ArrayList<YoutubeOrNull>>(listSize);

  // prepopulate a cache list for improved calculations
  for (let n = 0; n < listSize + 1; n++) {
    cache.push(new ArrayList<YoutubeOrNull>(maxLength + 1));
    for (let h = 0; h < maxLength + 1; h++) {
      cache.at(n).push(null);
    }
  }

  for (let i = 1; i < listSize + 1; i++) {
    const listItem = list.at(i - 1);
    const { seconds, rating } = listItem;
    const previousCacheItem = cache.at(i - 1);

    for (let j = 0; j < maxLength + 1; j++) {
      if (i === 0 || j === 0) {
        // cache.at(i).set(j, null);
        continue;
      }

      const cacheValueFromPreviousItem = previousCacheItem.at(j);

      if (seconds !== undefined && seconds <= j) {
        const combinedRating =
          seconds + (previousCacheItem.at(j - rating)?.rating || 0);

        const cacheValue =
          combinedRating > (cacheValueFromPreviousItem?.rating || 0)
            ? listItem
            : cacheValueFromPreviousItem;

        cache.at(i).set(j, cacheValue);
      } else {
        cache.at(i).set(j, cacheValueFromPreviousItem);
      }
    }
  }

  // this loop is for filtering out null and duplicate values
  // it's trying to prevent the returned list from being too long
  const resultQueue = new Queue();
  const cacheSize = cache.size() - 1;
  for (let i = cacheSize; i > 0; i--) {
    const item = cache.at(i);
    const itemSize = item.size() - 1;

    for (let j = itemSize; j > 0; j--) {
      const element = item.at(j);

      if (element !== null) {
        if (resultQueue.seconds() + element.seconds <= maxLength) {
          resultQueue.enqueue(element);
        }
      }
    }
  }

  return resultQueue;

  // const mm = new Queue();
  // const j = resultQueue.all();
  // const d = new ArrayList<YoutubeItem>(1);

  // for (let i = 0; i < j.size(); i++) {
  //   const element = j.at(i);

  //   if (!d.find((v) => v.id === element.id)) {
  //     d.push(element);
  //   }
  // }
  // mm.merge(d);

  // return mm;
}

export default knapsackDynamic;
