import { YoutubeItem } from "../types";

// This helper will generate n-length array of test data
const generateTestData = (n: number, seconds = 1): YoutubeItem[] =>
  [...Array(n).fill(null)].map((_, i) => ({
    id: `${i}`,
    title: "test",
    seconds,
  }));

export default generateTestData;
