import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import { YoutubeItem } from "../../types";
import knapsackDynamic from "./knapsack-dynamic";

describe("knapsack algorithm", () => {
  it("should return empty list when given list is empty and weight is zero", () => {
    const result = knapsackDynamic(new ArrayList<YoutubeItem>(0), 0);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list when given list is empty", () => {
    const result = knapsackDynamic(new ArrayList<YoutubeItem>(1), 1000);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return the only item if only one item in the list and the item fits", () => {
    const list = new ArrayList<YoutubeItem>(1);
    list.push({ title: "test", seconds: 123, id: "test", rating: 1 });
    const result = knapsackDynamic(list, 123);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 123, id: "test", rating: 1 },
    ]);
  });

  it("should return the only item if only one item in the list and the item fits", () => {
    const list = new ArrayList<YoutubeItem>(1);
    list.push({ title: "test", seconds: 123, id: "test", rating: 1 });
    list.push({ title: "test 2", seconds: 123, id: "test2", rating: 5 });
    const result = knapsackDynamic(list, 123);
    expect(result.all().getAsArray()).toEqual([
      { title: "test 2", seconds: 123, id: "test2", rating: 5 },
    ]);
  });

  it("should return the only item which fits the given length", () => {
    const list = new ArrayList<YoutubeItem>(1);
    list.push({ id: "1", title: "test1", seconds: 70, rating: 5 });
    list.push({ id: "2", title: "test2", seconds: 80, rating: 4 });
    list.push({ id: "3", title: "test3", seconds: 100, rating: 3 });
    list.push({ id: "4", title: "test4", seconds: 130, rating: 2 });
    list.push({ id: "5", title: "test5", seconds: 140, rating: 1 });
    list.push({ id: "6", title: "test6", seconds: 160, rating: 1 });
    const result = knapsackDynamic(list, 70);

    expect(result.averageRating()).toEqual(5);
    expect(result.seconds()).toEqual(70);
  });

  // describe("short playlists with full music catalog", () => {
  //   const catalog = YoutubeMusic().all();

  //   it("should return a one minute playlist", () => {
  //     const result = knapsackDynamic(catalog, 60);
  //     expect(result.averageRating()).toEqual(1.5);
  //     expect(result.seconds()).toEqual(60);
  //   });
  //   it("should return a two minute playlist", () => {
  //     const result = knapsackDynamic(catalog, 120);
  //     expect(result.averageRating()).toEqual(1.5);
  //     expect(result.seconds()).toEqual(76);
  //   });
  //   it("should return a three minute playlist", () => {
  //     const result = knapsackDynamic(catalog, 180);
  //     expect(result.averageRating()).toEqual(2);
  //     expect(result.seconds()).toEqual(172);
  //   });
  //   it("should return a four minute playlist", () => {
  //     const result = knapsackDynamic(catalog, 240);
  //     expect(result.averageRating()).toEqual(1.67);
  //     expect(result.seconds()).toEqual(191);
  //   });
  //   it("should return a five minute playlist", () => {
  //     const result = knapsackDynamic(catalog, 300);
  //     expect(result.averageRating()).toEqual(1.5);
  //     expect(result.seconds()).toEqual(166);
  //   });
  //   it("should return a one hour playlist", () => {
  //     const result = knapsackDynamic(catalog, 3600);
  //     expect(result.averageRating()).toEqual(1.67);
  //     expect(result.seconds()).toEqual(191);
  //   });
  //   it("should return a two hour playlist", () => {
  //     const result = knapsackDynamic(catalog, 3600 * 2);
  //     // console.log("result", result.all());
  //     expect(result.averageRating()).toEqual(1.5);
  //     expect(result.seconds()).toEqual(254);
  //   });
  // });

  // it("should return a list which contains all the items, because the weight is larger than the sum of item weights", () => {
  //   const list = new ArrayList<YoutubeItem>(1);
  //   list.push({ title: "test", seconds: 3, id: "test", rating: 1 });
  //   list.push({ title: "test2", seconds: 2, id: "test2", rating: 1 });
  //   const result = knapsackDynamic(list, 6);
  //   expect(result.all().getAsArray()).toEqual([
  //     { title: "test2", seconds: 2, id: "test2", rating: 1 },
  //   ]);
  // });
});
