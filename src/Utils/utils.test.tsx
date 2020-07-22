import sample from "./utils";

describe("utils", () => {
  it("should sample list", () => {
    const list = [
      { title: "test", seconds: 100, id: "test" },
      { title: "test1", seconds: 100, id: "test1" },
      { title: "test2", seconds: 100, id: "test2" },
      { title: "test3", seconds: 100, id: "test3" },
      { title: "test4", seconds: 100, id: "test4" },
      { title: "test5", seconds: 100, id: "test5" },
      { title: "test6", seconds: 100, id: "test6" },
    ];

    expect(sample(list, 3)).not.toEqual(list);
    expect(sample(list, 3).length).toEqual(3);
  });
});
