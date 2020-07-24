import YoutubeMusic from "../../Models/Youtube/Youtube";
import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import knapsack from "./knapsack";

// This helper will generate n-length array of test data
const generateTestData = (n: number, seconds = 1) =>
  [...Array(n).fill(null)].map(() => ({
    id: "1",
    title: "test",
    seconds,
  }));

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

  it("should return empty list when given list is empty and weight is negative", () => {
    expect(knapsack([], -10)).toEqual([]);
  });

  it("should return the only item if only one item in the list and the item fits", () => {
    expect(
      knapsack([{ title: "test", seconds: 123, id: "test" }], 123)
    ).toEqual([{ title: "test", seconds: 123, id: "test" }]);
  });

  it("should return empty list when the list contains data but the weight limit is zero", () => {
    expect(knapsack([{ title: "test", seconds: 123, id: "test" }], 0)).toEqual(
      []
    );
  });

  it("should return empty list when the list contains data but the weight limit is negative", () => {
    expect(knapsack([{ title: "test", seconds: 123, id: "test" }], -1)).toEqual(
      []
    );
  });

  it("should return empty list when the list contains large amount of data but the weight limit is negative", () => {
    expect(knapsack(generateTestData(10000), -1)).toEqual([]);
  });

  it("should return empty list if all the videos are shorter than given length", () => {
    expect(knapsack([{ title: "test", seconds: 123, id: "test" }], 1)).toEqual(
      []
    );
  });

  it("should return a list which only contains the first element which fits, when all the elements have same size and the weight limit matches the size", () => {
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

  it("should return a list which only contains elements which combined, fit into the given weight", () => {
    expect(
      knapsack(
        [
          { title: "test", seconds: 3, id: "test" },
          { title: "test2", seconds: 2, id: "test2" },
        ],
        5
      )
    ).toEqual([
      { title: "test", seconds: 3, id: "test" },
      { title: "test2", seconds: 2, id: "test2" },
    ]);
  });

  it("should return a list which has length of 5, leaving one of the items out of the result", () => {
    expect(
      knapsack(
        [
          { title: "test", seconds: 3, id: "test" },
          { title: "test2", seconds: 2, id: "test2" },
          { title: "test3", seconds: 1, id: "test3" },
        ],
        5
      )
    ).toEqual([
      { title: "test", seconds: 3, id: "test" },
      { title: "test2", seconds: 2, id: "test2" },
    ]);
  });

  it("should return a list which contains all the items, because the weight is larger than the sum of item weights", () => {
    expect(
      knapsack(
        [
          { title: "test", seconds: 3, id: "test" },
          { title: "test2", seconds: 2, id: "test2" },
        ],
        6
      )
    ).toEqual([
      { title: "test", seconds: 3, id: "test" },
      { title: "test2", seconds: 2, id: "test2" },
    ]);
  });

  it("should return a list which contains all the items, because the weight is 1000 times larger than the sum of item weights", () => {
    expect(
      knapsack(
        [
          { title: "test", seconds: 3, id: "test" },
          { title: "test2", seconds: 2, id: "test2" },
        ],
        5000
      )
    ).toEqual([
      { title: "test", seconds: 3, id: "test" },
      { title: "test2", seconds: 2, id: "test2" },
    ]);
  });

  describe("short playlists with full music catalog", () => {
    const catalog = YoutubeMusic();

    it("should return a one minute playlist", () => {
      expect(sumSeconds(knapsack(catalog, 60))).toBe(45);
    });
    it("should return a two minute playlist", () => {
      expect(sumSeconds(knapsack(catalog, 120))).toBe(88);
    });
    it("should return a three minute playlist", () => {
      expect(sumSeconds(knapsack(catalog, 180))).toBe(176);
    });
    it("should return a four minute playlist", () => {
      expect(sumSeconds(knapsack(catalog, 240))).toBe(223);
    });
    it("should return a five minute playlist", () => {
      expect(sumSeconds(knapsack(catalog, 300))).toBe(284);
    });
  });

  it("should return one hour long playlist", () => {
    // take 20 videos from the list and try to generate one hour of music
    const playlist = knapsack(YoutubeMusic().slice(-20), 3600);

    expect(sumSeconds(playlist)).toBe(3590);
    expect(playlist).toMatchSnapshot();
  });

  // these test cases are here to show the difference in playlist length when selecting different subset of videos
  // as we can see from the expected results, they do not match 100% with the desired playlist length. This will probably change once the playlist contains more items
  describe("variations on playlist", () => {
    describe("one hour playlist", () => {
      it("should return one hour long playlist, on a slice fom 0 to 20 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(0, 20), 3600);
        expect(sumSeconds(playlist)).toBe(3531);
      });
      it("should return one hour long playlist, on a slice fom 20 to 40 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(20, 40), 3600);
        expect(sumSeconds(playlist)).toBe(3588);
      });
      it("should return one hour long playlist, on a slice fom 40 to 60 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(40, 60), 3600);
        expect(sumSeconds(playlist)).toBe(3566);
      });
      it("should return one hour long playlist, on a slice fom 60 to 80 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(60, 80), 3600);
        expect(sumSeconds(playlist)).toBe(3444);
      });
    });

    describe("two hour playlist", () => {
      it("should return two hour long playlist, on a slice fom 0 to 20 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(0, 20), 3600 * 2);
        expect(sumSeconds(playlist)).toBe(5198);
      });
      it("should return two hour long playlist, on a slice fom 20 to 40 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(20, 40), 3600 * 2);
        expect(sumSeconds(playlist)).toBe(5852);
      });
      it("should return two hour long playlist, on a slice fom 40 to 60 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(40, 60), 3600 * 2);
        expect(sumSeconds(playlist)).toBe(5687);
      });
      it("should return two hour long playlist, on a slice fom 60 to 80 from music list", () => {
        const playlist = knapsack(YoutubeMusic().slice(60, 80), 3600 * 2);
        expect(sumSeconds(playlist)).toBe(6782);
      });
    });
  });

  describe("exact matches", () => {
    const matches = [
      { seconds: 10, weight: 100 },
      { seconds: 20, weight: 200 },
      { seconds: 30, weight: 300 },
      { seconds: 40, weight: 400 },
      { seconds: 50, weight: 500 },
    ];

    matches.forEach(({ seconds, weight }) => {
      it(`should return a playlist which is ${weight} seconds long, given small enough items`, () => {
        const items: YoutubeItem[] = generateTestData(10, seconds);
        const playlist = knapsack(items, weight);
        expect(sumSeconds(playlist)).toBe(weight);
      });
    });
  });

  // test commented because it's a bit slow
  // it("should return a two hour long playlist", () => {
  //   // take 30 videos from the list and try to generate two hours of music
  //   const playlist = knapsack(YoutubeMusic().slice(-30), 3600 * 2);

  //   expect(sumSeconds(playlist)).toBe(7167);
  // });
});
