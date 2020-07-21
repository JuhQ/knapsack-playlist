import sumSeconds from "./math";

describe("math", () => {
  it("should return zero on empty list", () => {
    expect(sumSeconds([])).toEqual(0);
  });

  it("should return the length of the only item", () => {
    expect(sumSeconds([{ title: "test", seconds: 123, id: "test" }])).toEqual(
      123
    );
  });

  it("should return the length of multiple items", () => {
    expect(
      sumSeconds([
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
        { title: "test", seconds: 100, id: "test" },
      ])
    ).toEqual(700);
  });

  it("should return negative length of the only item", () => {
    expect(sumSeconds([{ title: "test", seconds: -123, id: "test" }])).toEqual(
      -123
    );
  });
});
