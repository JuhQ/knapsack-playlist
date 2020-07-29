import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import ArrayList from "../ArrayList/ArrayList";

class Queue {
  private list: ArrayList<YoutubeItem>;

  constructor() {
    this.list = new ArrayList(1);
  }

  // Time complexity O(1)
  all(): ArrayList<YoutubeItem> {
    return this.list;
  }

  // Time complexity O(1)
  length(): number {
    return this.list.size();
  }

  // return the playlist length in seconds
  // Time complexity O(n)
  seconds(): number {
    return sumSeconds(this.list.getAsArray());
  }

  // this method is only for the knapsack algorithm
  // Time complexity O(1)
  at(index: number): YoutubeItem {
    return this.list.at(index);
  }

  // this method is only for the knapsack algorithm test cases
  // Time complexity O(n)
  slice(start: number, end?: number): ArrayList<YoutubeItem> {
    return this.list.slice(start, end);
  }

  // merge array list or queue to queue
  // Time complexity O(n)
  merge(list: Queue | ArrayList<YoutubeItem>): void {
    const values = list instanceof Queue ? list.all() : list;

    for (let i = 0; i < values.size(); i++) {
      this.enqueue(values.at(i));
    }
  }

  // add value to the end of the queue
  // fat arrow syntax allows us to bind `this` to the scope of the class instead of the caller scope
  // Time complexity O(1)
  enqueue = (value: YoutubeItem): void => {
    this.list.push(value);
  };

  // remove item from the beginning of the queue and return that value
  // Time complexity O(n)
  dequeue(): YoutubeItem | undefined {
    return this.list.shift();
  }
}

export default Queue;
