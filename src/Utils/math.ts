/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import { YoutubeItem } from "../types";

const addSeconds = (a: number, { seconds }: YoutubeItem): number => a + seconds;

export const sumSeconds = (list: YoutubeItem[]): number =>
  list.reduce(addSeconds, 0);

// https://en.wikipedia.org/wiki/Xorshift
// implementation based on https://svijaykoushik.github.io/blog/2019/10/04/three-awesome-ways-to-generate-random-number-in-javascript/
const xorShift = (seed: number) => {
  seed ^= seed << 13;

  seed ^= seed >> 17;

  seed ^= seed << 5;

  return seed < 0 ? ~seed + 1 : seed;
};

export const random = (): number => {
  const seed = +new Date() * new Date().getMilliseconds();

  return Number(`0.${xorShift(seed)}`);
};

export const averageRating = (list: YoutubeItem[]): number => {
  if (!list.length) {
    return 0;
  }

  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i].rating;
  }

  return Number((total / list.length).toFixed(2));
};
