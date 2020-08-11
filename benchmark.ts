/* eslint-disable no-console */
import Benchmark from "benchmark";

import knapsack from "./src/Algorithms/knapsack/knapsack";
import Queue from "./src/Datastructures/queue/queue";
import YoutubeMusic from "./src/Models/Youtube/Youtube";

interface Complete {
  filter: (s: string) => { map: (v: string) => void };
}

const suite = new Benchmark.Suite();

suite
  .add("Knapsack recursive playlist generation 10 videos, 3600 seconds", () => {
    const list = new Queue();
    list.merge(YoutubeMusic().slice(-10));
    const playlist = knapsack(list, 3600);
    return playlist;
  })
  .add("Knapsack recursive playlist generation 20 videos, 3600 seconds", () => {
    const list = new Queue();
    list.merge(YoutubeMusic().slice(-20));
    const playlist = knapsack(list, 3600);
    return playlist;
  })
  .on("cycle", (event: { target: string }) => {
    console.log(String(event.target));
  })
  .on("complete", function complete(this: Complete) {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
