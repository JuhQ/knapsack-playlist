import { YoutubeItem } from "../../types";
import ArrayList from "../ArrayList/ArrayList";
import Queue from "./queue";

describe("queue data structure", () => {
  it("should return an empty queue when nothing has been enqueued", () => {
    const queue = new Queue();

    expect(queue.length()).toEqual(0);
    expect(queue.all().getAsArray()).toEqual([]);
    expect(queue.seconds()).toEqual(0);
  });

  it("should be able to add a value", () => {
    const queue = new Queue();

    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1, rating: 1 });
    expect(queue.length()).toEqual(1);
  });

  it("should be able to show all the values, when given only one item", () => {
    const queue = new Queue();

    expect(queue.all().getAsArray()).toEqual([]);
    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1, rating: 1 });
    expect(queue.all().getAsArray()).toEqual([
      { id: "1", title: "1", seconds: 1, rating: 1 },
    ]);
    expect(queue.length()).toEqual(1);
  });

  it("should be able to show all the values, when given multiple items", () => {
    const queue = new Queue();

    expect(queue.all().getAsArray()).toEqual([]);
    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 1, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 1, rating: 1 });

    expect(queue.all().getAsArray()).toEqual([
      { id: "1", title: "1", seconds: 1, rating: 1 },
      { id: "2", title: "2", seconds: 1, rating: 1 },
      { id: "3", title: "3", seconds: 1, rating: 1 },
    ]);
    expect(queue.length()).toEqual(3);
  });

  it("should be able to remove first item from the list and return the removed item", () => {
    const queue = new Queue();

    expect(queue.all().getAsArray()).toEqual([]);
    expect(queue.length()).toEqual(0);

    queue.enqueue({ id: "1", title: "1", seconds: 1, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 1, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 1, rating: 1 });
    expect(queue.length()).toEqual(3);

    expect(queue.dequeue()).toEqual({
      id: "1",
      title: "1",
      seconds: 1,
      rating: 1,
    });

    expect(queue.length()).toEqual(2);
    expect(queue.all().getAsArray()).toEqual([
      { id: "2", title: "2", seconds: 1, rating: 1 },
      { id: "3", title: "3", seconds: 1, rating: 1 },
    ]);
  });

  it("should be able to remove the only item", () => {
    const queue = new Queue();

    expect(queue.all().getAsArray()).toEqual([]);
    expect(queue.length()).toEqual(0);

    queue.enqueue({ id: "1", title: "1", seconds: 1, rating: 1 });
    expect(queue.length()).toEqual(1);

    expect(queue.dequeue()).toEqual({
      id: "1",
      title: "1",
      seconds: 1,
      rating: 1,
    });
    expect(queue.length()).toEqual(0);
  });

  it("should be able to return playlist length in seconds", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 1 });
    expect(queue.seconds()).toEqual(646);
  });

  it("should be able to return playlist ratings average", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 2 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 3 });
    queue.enqueue({ id: "4", title: "4", seconds: 400, rating: 4 });
    queue.enqueue({ id: "5", title: "5", seconds: 400, rating: 4 });
    expect(queue.averageRating()).toEqual(2.8);
  });

  it("should be able to return playlist ratings average on an empty queue", () => {
    const queue = new Queue();
    expect(queue.averageRating()).toEqual(0);
  });

  it("should return a shorter playlist length after an item has been dequeued", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 1 });
    expect(queue.seconds()).toEqual(646);
    expect(queue.dequeue()).toEqual({
      id: "1",
      title: "1",
      seconds: 123,
      rating: 1,
    });
    expect(queue.seconds()).toEqual(523);
  });

  it("should return value at a given index", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 1 });
    expect(queue.at(0)).toEqual({
      id: "1",
      title: "1",
      seconds: 123,
      rating: 1,
    });
    expect(queue.at(1)).toEqual({
      id: "2",
      title: "2",
      seconds: 123,
      rating: 1,
    });
    expect(queue.at(2)).toEqual({
      id: "3",
      title: "3",
      seconds: 400,
      rating: 1,
    });
  });

  it("should return undefined from position which does not exist in the queue", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 1 });
    expect(queue.at(3)).toEqual(undefined);
  });

  it("should return a specific slice of the list", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 400, rating: 1 });
    expect(queue.slice(0).getAsArray()).toEqual(queue.all().getAsArray());
    expect(queue.slice(-2).getAsArray()).toEqual([
      { id: "2", seconds: 123, rating: 1, title: "2" },
      { id: "3", seconds: 400, rating: 1, title: "3" },
    ]);
    expect(queue.slice(0, 1).getAsArray()).toEqual([
      { id: "1", seconds: 123, rating: 1, title: "1" },
    ]);
    expect(queue.slice(1, 2).getAsArray()).toEqual([
      { id: "2", seconds: 123, rating: 1, title: "2" },
    ]);
  });

  describe("merge", () => {
    it("should be able to merge queue", () => {
      const queue = new Queue();

      queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
      queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });

      const newQueue = new Queue();
      newQueue.merge(queue);

      expect(newQueue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
      ]);
    });

    it("should be able to merge queue and enqueue more items", () => {
      const queue = new Queue();

      queue.enqueue({ id: "1", title: "1", seconds: 123, rating: 1 });
      queue.enqueue({ id: "2", title: "2", seconds: 123, rating: 1 });

      const newQueue = new Queue();
      newQueue.merge(queue);

      expect(newQueue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
      ]);

      newQueue.enqueue({ id: "3", title: "3", seconds: 123, rating: 1 });

      expect(newQueue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
        { id: "3", seconds: 123, rating: 1, title: "3" },
      ]);
    });

    it("should be able to merge list", () => {
      const list = new ArrayList<YoutubeItem>(2);
      list.push({ id: "1", title: "1", seconds: 123, rating: 1 });
      list.push({ id: "2", title: "2", seconds: 123, rating: 1 });

      const queue = new Queue();
      queue.merge(list);

      expect(queue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
      ]);
    });

    it("should be able to merge list and enqueue more items", () => {
      const list = new ArrayList<YoutubeItem>(2);
      list.push({ id: "1", title: "1", seconds: 123, rating: 1 });
      list.push({ id: "2", title: "2", seconds: 123, rating: 1 });

      const queue = new Queue();
      queue.merge(list);

      expect(queue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
      ]);

      queue.enqueue({ id: "3", title: "3", seconds: 123, rating: 1 });

      expect(queue.all().getAsArray()).toEqual([
        { id: "1", seconds: 123, rating: 1, title: "1" },
        { id: "2", seconds: 123, rating: 1, title: "2" },
        { id: "3", seconds: 123, rating: 1, title: "3" },
      ]);
    });
  });
});
