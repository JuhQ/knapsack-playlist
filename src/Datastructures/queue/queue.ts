import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";

class Queue {
  private list: YoutubeItem[] = [];

  all(): YoutubeItem[] {
    return this.list;
  }

  length(): number {
    return this.list.length;
  }

  // return the playlist length in seconds
  seconds(): number {
    return sumSeconds(this.list);
  }

  // this method is only for the knapsack algorithm
  at(index: number): YoutubeItem {
    return this.list[index];
  }

  // this method is only for the knapsack algorithm test cases
  slice(start: number, end?: number): YoutubeItem[] {
    return this.list.slice(start, end);
  }

  // merge array list or queue to queue
  merge(list: Queue | YoutubeItem[]): void {
    const values = list instanceof Queue ? list.all() : list;

    for (let i = 0; i < values.length; i++) {
      this.enqueue(values[i]);
    }
  }

  // add value to the end of the queue
  // fat arrow syntax allows us to bind `this` to the scope of the class instead of the caller scope
  enqueue = (value: YoutubeItem): void => {
    this.list.push(value);
  };

  // remove item from the beginning of the queue and return that value
  dequeue(): YoutubeItem | undefined {
    return this.list.shift();
  }
}

export default Queue;
