/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import Benchmark from "benchmark";

import knapsack from "./src/Algorithms/knapsack/knapsack";
import Queue from "./src/Datastructures/queue/queue";
import YoutubeMusic from "./src/Models/Youtube/Youtube";

interface Complete {
  filter: (s: string) => { map: (v: string) => void };
}

const suite = new Benchmark.Suite();

const videoCount = [10, 15, 20, 25, 30];
const seconds = [600, 1200, 1800, 3600, 7200, 14400];

videoCount.map((videos) =>
  seconds.map((second) => {
    suite.add(
      `Knapsack recursive playlist generation ${videos} videos, ${second} seconds`,
      () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(-videos));
        return knapsack(list, second);
      }
    );
  })
);

suite
  .on("cycle", (event: { target: { stats: { mean: number } } }) => {
    console.log(String(event.target), event.target.stats.mean);
  })
  .on("complete", function complete(this: Complete) {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
