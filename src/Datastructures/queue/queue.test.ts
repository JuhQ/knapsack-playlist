import Queue from "./queue";

describe("queue data structure", () => {
  it("should return an empty queue when nothing has been enqueued", () => {
    const queue = new Queue();

    expect(queue.length()).toEqual(0);
    expect(queue.all()).toEqual([]);
    expect(queue.seconds()).toEqual(0);
  });

  it("should be able to add a value", () => {
    const queue = new Queue();

    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1 });
    expect(queue.length()).toEqual(1);
  });

  it("should be able to show all the values, when given only one item", () => {
    const queue = new Queue();

    expect(queue.all()).toEqual([]);
    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1 });
    expect(queue.all()).toEqual([{ id: "1", title: "1", seconds: 1 }]);
    expect(queue.length()).toEqual(1);
  });

  it("should be able to show all the values, when given multiple items", () => {
    const queue = new Queue();

    expect(queue.all()).toEqual([]);
    expect(queue.length()).toEqual(0);
    queue.enqueue({ id: "1", title: "1", seconds: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 1 });

    expect(queue.all()).toEqual([
      { id: "1", title: "1", seconds: 1 },
      { id: "2", title: "2", seconds: 1 },
      { id: "3", title: "3", seconds: 1 },
    ]);
    expect(queue.length()).toEqual(3);
  });

  it("should be able to remove first item from the list and return the removed item", () => {
    const queue = new Queue();

    expect(queue.all()).toEqual([]);
    expect(queue.length()).toEqual(0);

    queue.enqueue({ id: "1", title: "1", seconds: 1 });
    queue.enqueue({ id: "2", title: "2", seconds: 1 });
    queue.enqueue({ id: "3", title: "3", seconds: 1 });
    expect(queue.length()).toEqual(3);

    expect(queue.dequeue()).toEqual({ id: "1", title: "1", seconds: 1 });

    expect(queue.length()).toEqual(2);
    expect(queue.all()).toEqual([
      { id: "2", title: "2", seconds: 1 },
      { id: "3", title: "3", seconds: 1 },
    ]);
  });

  it("should be able to return playlist length in seconds", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123 });
    queue.enqueue({ id: "2", title: "2", seconds: 123 });
    queue.enqueue({ id: "3", title: "3", seconds: 400 });
    expect(queue.seconds()).toEqual(646);
  });

  it("should return a shorter playlist length after an item has been dequeued", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123 });
    queue.enqueue({ id: "2", title: "2", seconds: 123 });
    queue.enqueue({ id: "3", title: "3", seconds: 400 });
    expect(queue.seconds()).toEqual(646);
    expect(queue.dequeue()).toEqual({ id: "1", title: "1", seconds: 123 });
    expect(queue.seconds()).toEqual(523);
  });

  it("should return value at a given index", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123 });
    queue.enqueue({ id: "2", title: "2", seconds: 123 });
    queue.enqueue({ id: "3", title: "3", seconds: 400 });
    expect(queue.at(0)).toEqual({ id: "1", title: "1", seconds: 123 });
    expect(queue.at(1)).toEqual({ id: "2", title: "2", seconds: 123 });
    expect(queue.at(2)).toEqual({ id: "3", title: "3", seconds: 400 });
  });

  it("should return undefined from position which does not exist in the queue", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123 });
    queue.enqueue({ id: "2", title: "2", seconds: 123 });
    queue.enqueue({ id: "3", title: "3", seconds: 400 });
    expect(queue.at(3)).toEqual(undefined);
  });

  it("should return a specific slice of the list", () => {
    const queue = new Queue();

    queue.enqueue({ id: "1", title: "1", seconds: 123 });
    queue.enqueue({ id: "2", title: "2", seconds: 123 });
    queue.enqueue({ id: "3", title: "3", seconds: 400 });
    expect(queue.slice(0)).toEqual(queue.all());
    expect(queue.slice(-2)).toEqual([
      { id: "2", seconds: 123, title: "2" },
      { id: "3", seconds: 400, title: "3" },
    ]);
    expect(queue.slice(0, 1)).toEqual([{ id: "1", seconds: 123, title: "1" }]);
    expect(queue.slice(1, 2)).toEqual([{ id: "2", seconds: 123, title: "2" }]);
  });

  describe("merge", () => {
    it("should be able to merge queue", () => {
      const queue = new Queue();

      queue.enqueue({ id: "1", title: "1", seconds: 123 });
      queue.enqueue({ id: "2", title: "2", seconds: 123 });

      const newQueue = new Queue();
      newQueue.merge(queue);

      expect(newQueue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
      ]);
    });

    it("should be able to merge queue and enqueue more items", () => {
      const queue = new Queue();

      queue.enqueue({ id: "1", title: "1", seconds: 123 });
      queue.enqueue({ id: "2", title: "2", seconds: 123 });

      const newQueue = new Queue();
      newQueue.merge(queue);

      expect(newQueue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
      ]);

      newQueue.enqueue({ id: "3", title: "3", seconds: 123 });

      expect(newQueue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
        { id: "3", seconds: 123, title: "3" },
      ]);
    });

    it("should be able to merge list", () => {
      const queue = new Queue();

      queue.merge([
        { id: "1", title: "1", seconds: 123 },
        { id: "2", title: "2", seconds: 123 },
      ]);

      expect(queue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
      ]);
    });

    it("should be able to merge list and enqueue more items", () => {
      const queue = new Queue();

      queue.merge([
        { id: "1", title: "1", seconds: 123 },
        { id: "2", title: "2", seconds: 123 },
      ]);

      expect(queue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
      ]);

      queue.enqueue({ id: "3", title: "3", seconds: 123 });

      expect(queue.all()).toEqual([
        { id: "1", seconds: 123, title: "1" },
        { id: "2", seconds: 123, title: "2" },
        { id: "3", seconds: 123, title: "3" },
      ]);
    });
  });
});
