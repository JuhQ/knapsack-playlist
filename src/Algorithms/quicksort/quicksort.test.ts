import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import { random } from "../../Utils/math";
import quicksort, { Sort } from "./quicksort";

describe("Quicksort algorithm", () => {
  it("should sort a small list", () => {
    const list = new ArrayList<Sort>(2);
    list.push({ id: "2", title: "test 2", seconds: 2, sort: 2 });
    list.push({ id: "1", title: "test 1", seconds: 1, sort: 1 });

    const result = quicksort(list);
    expect(result.getAsArray()).toEqual([
      {
        id: "1",
        seconds: 1,
        title: "test 1",
        sort: 1,
      },
      {
        id: "2",
        seconds: 2,
        title: "test 2",
        sort: 2,
      },
    ]);
    expect(result.getAsArray()).not.toEqual(list.getAsArray());
  });

  it("should not do anything for empty list", () => {
    const list = new ArrayList<Sort>(0);

    const result = quicksort(list);
    expect(result.getAsArray()).toEqual([]);
  });

  it("should sort a larger list", () => {
    const list = new ArrayList<Sort>(1001);
    for (let i = 1000; i >= 0; i--) {
      list.push({ id: `${i}`, title: `test ${i}`, seconds: i, sort: i });
    }

    const result = quicksort(list);
    expect(result.getAsArray()).toMatchSnapshot();
    expect(result.getAsArray()[0]).toEqual({
      id: "0",
      title: "test 0",
      seconds: 0,
      sort: 0,
    });
    expect(result.getAsArray()[1000]).toEqual({
      id: "1000",
      title: "test 1000",
      seconds: 1000,
      sort: 1000,
    });
    expect(result.size()).toEqual(1001);
    expect(result.getAsArray()).not.toEqual(list.getAsArray());
  });

  it("should sort random data", () => {
    const list = new ArrayList<Sort>(1000);

    for (let i = 0; i < 999; i++) {
      list.push({ id: `${i}`, title: `test ${i}`, seconds: i, sort: random() });
    }

    list.push({ id: "999", title: "test 999", seconds: 999, sort: 999 });

    const result = quicksort(list);
    expect(result.size()).toEqual(1000);
    expect(result.getAsArray()).not.toEqual(list.getAsArray());
  });
});
