import ArrayList from "../Datastructures/ArrayList/ArrayList";
import { YoutubeItem } from "../types";
import { random } from "./math";

const sample = (
  list: ArrayList<YoutubeItem>,
  size: number
): ArrayList<YoutubeItem> =>
  list
    .map((item) => ({ ...item, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ sort, ...item }) => ({ ...item }))
    .slice(-size);

export default sample;
