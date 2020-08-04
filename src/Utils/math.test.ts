import { random, sumSeconds } from "./math";

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
});
