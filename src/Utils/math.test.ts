import { YoutubeItem } from "../types";
import { averageRating, random, sumSeconds } from "./math";

describe("math", () => {
  describe("sumSeconds", () => {
    it("should return zero on empty list", () => {
      expect(sumSeconds([])).toEqual(0);
    });

    it("should return the length of the only item", () => {
      expect(
        sumSeconds([{ title: "test", seconds: 123, id: "test", rating: 1 }])
      ).toEqual(123);
    });

    it("should return the length of multiple items", () => {
      expect(
        sumSeconds([
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
          { title: "test", seconds: 100, id: "test", rating: 1 },
        ])
      ).toEqual(700);
    });

    it("should return negative length of the only item", () => {
      expect(
        sumSeconds([{ title: "test", seconds: -123, id: "test", rating: 1 }])
      ).toEqual(-123);
    });
  });

  describe("random", () => {
    it("should return random value", () => {
      expect(random()).not.toBeNaN();
    });

    it("should return value greater than zero", () => {
      expect(random()).toBeGreaterThan(0);
    });

    it("should return value less than one", () => {
      expect(random()).toBeLessThan(1);
    });
  });

  describe("average", () => {
    it("should return zero on empty array", () => {
      const list: YoutubeItem[] = [];
      expect(averageRating(list)).toEqual(0);
    });
    it("should return rating of 1 from list with one item", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 1 },
      ];
      expect(averageRating(list)).toEqual(1);
    });
    it("should return rating of 5 from list with one item", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 5 },
      ];
      expect(averageRating(list)).toEqual(5);
    });
    it("should return rating of 5 from list with multiple items with rating 5", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 5 },
        { id: "2", title: "test", seconds: 1, rating: 5 },
        { id: "3", title: "test", seconds: 1, rating: 5 },
        { id: "4", title: "test", seconds: 1, rating: 5 },
      ];
      expect(averageRating(list)).toEqual(5);
    });
    it("should return rating from list of multiple items", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 1 },
        { id: "2", title: "test", seconds: 1, rating: 2 },
        { id: "3", title: "test", seconds: 1, rating: 3 },
        { id: "4", title: "test", seconds: 1, rating: 4 },
        { id: "5", title: "test", seconds: 1, rating: 5 },
      ];
      expect(averageRating(list)).toEqual(3);
    });
    it("should return decimal rating from list of multiple items", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 1 },
        { id: "2", title: "test", seconds: 1, rating: 3 },
        { id: "3", title: "test", seconds: 1, rating: 3 },
        { id: "4", title: "test", seconds: 1, rating: 4 },
        { id: "5", title: "test", seconds: 1, rating: 5 },
      ];
      expect(averageRating(list)).toEqual(3.2);
    });
    it("should return maximum decimal of two", () => {
      const list: YoutubeItem[] = [
        { id: "1", title: "test", seconds: 1, rating: 1 },
        { id: "2", title: "test", seconds: 1, rating: 3 },
        { id: "3", title: "test", seconds: 1, rating: 3 },
        { id: "4", title: "test", seconds: 1, rating: 3 },
        { id: "5", title: "test", seconds: 1, rating: 4 },
        { id: "6", title: "test", seconds: 1, rating: 4 },
        { id: "7", title: "test", seconds: 1, rating: 4 },
        { id: "8", title: "test", seconds: 1, rating: 4 },
      ];
      expect(averageRating(list)).toEqual(3.25);
    });
  });
});
