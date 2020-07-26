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

  seconds(): number {
    return sumSeconds(this.list);
  }

  enqueue(value: YoutubeItem): void {
    this.list.push(value);
  }

  dequeue(): YoutubeItem | undefined {
    return this.list.shift();
  }
}

export default Queue;
