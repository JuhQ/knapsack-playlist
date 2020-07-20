import knapsack from "./knapsack";

describe("knapsack algorithm", () => {
  it("should return empty list when given weight is zero", () => {
    expect(knapsack([], 0)).toEqual([]);
  });

  it("should return empty list when given list is empty", () => {
    expect(knapsack([], 1000)).toEqual([]);
  });

  it("should return empty list when given list is empty and weight is zero", () => {
    expect(knapsack([], 0)).toEqual([]);
  });

  it("should return the only item if only one item in the list and the item fits", () => {
    expect(
      knapsack([{ title: "test", seconds: 123, id: "test" }], 123)
    ).toEqual([{ title: "test", seconds: 123, id: "test" }]);
  });

  it("should return empty list if all the videos are shorter than given length", () => {
    expect(knapsack([{ title: "test", seconds: 123, id: "test" }], 1)).toEqual(
      []
    );
  });

  it("should return a list which only contains elements which combined, fit into the given weight", () => {
    expect(
      knapsack(
        [
          { title: "test", seconds: 123, id: "test" },
          { title: "test2", seconds: 123, id: "test2" },
        ],
        123
      )
    ).toEqual([{ title: "test", seconds: 123, id: "test" }]);
  });
});
