import { YoutubeItem } from "../types";

const addSeconds = (a: number, { seconds }: YoutubeItem): number => a + seconds;

const sumSeconds = (list: YoutubeItem[]): number => list.reduce(addSeconds, 0);

export default sumSeconds;
