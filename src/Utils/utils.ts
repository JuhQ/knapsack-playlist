import quicksort from "../Algorithms/quicksort/quicksort";
import ArrayList from "../Datastructures/ArrayList/ArrayList";
import { YoutubeItem } from "../types";
import { random } from "./math";

/**
 * This function returns a given length randomized sample of given list.
 * Randomization happens by extending the YouTubeItem data type with sort key, which is given an random value
 * The list is then sorted based on this random value and the last n-values are returned
 * @param list ArrayList<YoutubeItem>
 * @param size number
 */
const sample = (
  list: ArrayList<YoutubeItem>,
  size: number
): ArrayList<YoutubeItem> =>
  quicksort(list.map((item) => ({ ...item, sort: random() })))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ sort, ...item }) => ({ ...item }))
    .slice(-size);

export default sample;
