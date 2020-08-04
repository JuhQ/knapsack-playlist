import { YoutubeItem } from "../../types";
import ArrayList from "./ArrayList";

describe("ArrayList data structure", () => {
  it("should return an empty ArrayList when nothing has been passed", () => {
    const array = new ArrayList(0);

    expect(array.size()).toEqual(0);
    expect(array.getAsArray()).toEqual([]);
  });

  it("should be able to an value to the list", () => {
    const array = new ArrayList<number>(1);
    expect(array.size()).toEqual(0);

    array.push(1);

    expect(array.size()).toEqual(1);
    expect(array.getAsArray()).toEqual([1]);
  });

  it("should be able to multiple items to the list", () => {
    const array = new ArrayList<number>(1);
    expect(array.size()).toEqual(0);
    array.push(1);
    expect(array.size()).toEqual(1);
    array.push(2);
    expect(array.size()).toEqual(2);
    array.push(3);

    expect(array.size()).toEqual(3);
    expect(array.getAsArray()).toEqual([1, 2, 3]);
  });

  it("should be able to get value from a specific index", () => {
    const array = new ArrayList<number>(1);
    array.push(1);
    array.push(2);
    array.push(3);

    expect(array.at(2)).toEqual(3);
  });

  it("should be able to shift value from the list", () => {
    const array = new ArrayList<number>(1);
    array.push(1);
    array.push(2);
    array.push(3);

    expect(array.shift()).toEqual(1);
    expect(array.getAsArray()).toEqual([2, 3]);
  });

  it("should be able to set value at a specific index", () => {
    const array = new ArrayList<number>(1);
    array.push(1);
    array.push(2);
    array.push(3);

    array.set(1, 500);

    expect(array.getAsArray()).toEqual([1, 500, 3]);
  });

  describe("find", () => {
    it("should be able to find a value", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const match = array.find((value) => value === 2);
      expect(match).toEqual(2);
    });

    it("should be return undefined if no item found on list", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const match = array.find((value) => value === 4);
      expect(match).toEqual(undefined);
    });
  });

  describe("slice", () => {
    it("should be able to slice list", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const sliced = array.slice(1, 3);

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual([1, 2, 3]);
      expect(sliced.size()).toEqual(2);
      expect(sliced.getAsArray()).toEqual([2, 3]);
      expect(sliced).not.toEqual(array);
    });

    it("should be able to slice list from start to end of list, when end value is missing", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);
      array.push(4);

      const sliced = array.slice(1);

      // expect(array.size()).toEqual(4);
      // expect(array.getAsArray()).toEqual([1, 2, 3, 4]);
      expect(sliced.size()).toEqual(3);
      expect(sliced.getAsArray()).toEqual([2, 3, 4]);
      expect(sliced).not.toEqual(array);
    });

    it("should be able to slice list from end when start value is negative", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const sliced = array.slice(-2);

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual([1, 2, 3]);
      expect(sliced.size()).toEqual(2);
      expect(sliced.getAsArray()).toEqual([2, 3]);
      expect(sliced).not.toEqual(array);
    });
  });

  describe("map", () => {
    it("should be able to map a number list", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const mapped = array.map((value) => value + 1);

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual([1, 2, 3]);
      expect(mapped.size()).toEqual(3);
      expect(mapped.getAsArray()).toEqual([2, 3, 4]);
      expect(mapped).not.toEqual(array);
    });

    it("should be able to map a string list", () => {
      const array = new ArrayList<string>(1);
      array.push("hello");
      array.push("again");
      array.push("my friend");

      const mapped = array.map((value) => `${value} doors`);

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual(["hello", "again", "my friend"]);
      expect(mapped.size()).toEqual(3);
      expect(mapped.getAsArray()).toEqual([
        "hello doors",
        "again doors",
        "my friend doors",
      ]);
      expect(mapped).not.toEqual(array);
    });
  });

  describe("filter", () => {
    it("should be able to filter a number list", () => {
      const array = new ArrayList<number>(1);
      array.push(1);
      array.push(2);
      array.push(3);

      const filtered = array.filter((value) => value === 2);

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual([1, 2, 3]);
      expect(filtered.size()).toEqual(1);
      expect(filtered.getAsArray()).toEqual([2]);
      expect(filtered).not.toEqual(array);
    });

    it("should be able to filter a string list", () => {
      const array = new ArrayList<string>(1);
      array.push("hello");
      array.push("again");
      array.push("my friend");

      const filtered = array.filter(
        (value) => value === "hello" || value === "my friend"
      );

      expect(array.size()).toEqual(3);
      expect(array.getAsArray()).toEqual(["hello", "again", "my friend"]);
      expect(filtered.size()).toEqual(2);
      expect(filtered.getAsArray()).toEqual(["hello", "my friend"]);
      expect(filtered).not.toEqual(array);
    });
  });

  describe("data types", () => {
    it("should be able use string types", () => {
      const array = new ArrayList<string>(1);

      array.push("hello");

      expect(array.size()).toEqual(1);
      expect(array.getAsArray()).toEqual(["hello"]);
    });

    it("should be able use number types", () => {
      const array = new ArrayList<number>(1);

      array.push(1);

      expect(array.size()).toEqual(1);
      expect(array.getAsArray()).toEqual([1]);
    });

    it("should be able use YouTubeItem type", () => {
      const array = new ArrayList<YoutubeItem>(1);

      array.push({ id: "1", title: "test", seconds: 1, rating: 1 });

      expect(array.size()).toEqual(1);
      expect(array.getAsArray()).toEqual([
        { id: "1", title: "test", seconds: 1, rating: 1 },
      ]);
    });
  });
});
