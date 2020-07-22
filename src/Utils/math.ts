import { YoutubeItem } from "../types";

const addSeconds = (a: number, { seconds }: YoutubeItem): number => a + seconds;

export const sumSeconds = (list: YoutubeItem[]): number =>
  list.reduce(addSeconds, 0);

export const random = (): number => Math.random();
