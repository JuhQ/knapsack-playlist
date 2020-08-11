import Queue from "../../Datastructures/queue/queue";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import generateTestData from "../../Utils/testHelpers";
import knapsack from "./knapsack";

describe("knapsack algorithm", () => {
  it("should return empty list when given list is empty and weight is zero", () => {
    const result = knapsack(new Queue(), 0);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list when given list is empty", () => {
    const result = knapsack(new Queue(), 1000);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list when given list is empty and weight is negative", () => {
    const result = knapsack(new Queue(), -10);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return the only item if only one item in the list and the item fits", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 123, id: "test", rating: 1 });
    const result = knapsack(list, 123);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 123, id: "test", rating: 1 },
    ]);
  });

  it("should return empty list when the list contains data but the weight limit is zero", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 123, id: "test", rating: 1 });
    const result = knapsack(list, 0);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list when the list contains data but the weight limit is negative", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 123, id: "test", rating: 1 });
    const result = knapsack(list, -1);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list when the list contains large amount of data but the weight limit is negative", () => {
    const result = knapsack(generateTestData(10000), -1);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return empty list if all the videos are shorter than given length", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 123, id: "test", rating: 1 });
    const result = knapsack(list, 1);
    expect(result.all().getAsArray()).toEqual([]);
    expect(result.seconds()).toBe(0);
    expect(result.averageRating()).toBe(0);
  });

  it("should return a list which only contains the first element which fits, when all the elements have same size and the weight limit matches the size", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 123, id: "test", rating: 2 });
    list.enqueue({ title: "test2", seconds: 123, id: "test2", rating: 1 });
    const result = knapsack(list, 123);
    expect(result.all().getAsArray()).toEqual([
      { title: "test2", seconds: 123, id: "test2", rating: 1 },
    ]);
  });

  it("should return a list which only contains elements which combined, fit into the given weight", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 3, id: "test", rating: 1 });
    list.enqueue({ title: "test2", seconds: 2, id: "test2", rating: 1 });
    const result = knapsack(list, 5);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 3, id: "test", rating: 1 },
      { title: "test2", seconds: 2, id: "test2", rating: 1 },
    ]);
  });

  it("should return a list which has length of 5, leaving one of the items out of the result", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 3, id: "test", rating: 1 });
    list.enqueue({ title: "test2", seconds: 2, id: "test2", rating: 1 });
    list.enqueue({ title: "test3", seconds: 1, id: "test3", rating: 1 });
    const result = knapsack(list, 5);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 3, id: "test", rating: 1 },
      { title: "test2", seconds: 2, id: "test2", rating: 1 },
    ]);
  });

  it("should return a list which contains all the items, because the weight is larger than the sum of item weights", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 3, id: "test", rating: 1 });
    list.enqueue({ title: "test2", seconds: 2, id: "test2", rating: 1 });
    const result = knapsack(list, 6);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 3, id: "test", rating: 1 },
      { title: "test2", seconds: 2, id: "test2", rating: 1 },
    ]);
  });

  it("should return a list which contains all the items, because the weight is 1000 times larger than the sum of item weights", () => {
    const list = new Queue();
    list.enqueue({ title: "test", seconds: 3, id: "test", rating: 1 });
    list.enqueue({ title: "test2", seconds: 2, id: "test2", rating: 1 });
    const result = knapsack(list, 5000);
    expect(result.all().getAsArray()).toEqual([
      { title: "test", seconds: 3, id: "test", rating: 1 },
      { title: "test2", seconds: 2, id: "test2", rating: 1 },
    ]);
  });

  describe("short playlists with full music catalog", () => {
    const catalog = YoutubeMusic();

    it("should return a one minute playlist", () => {
      const result = knapsack(catalog, 60);
      expect(result.seconds()).toBe(57);
      expect(result.averageRating()).toBe(5);
    });
    it("should return a two minute playlist", () => {
      const result = knapsack(catalog, 120);
      expect(result.seconds()).toBe(117);
      expect(result.averageRating()).toBe(5);
    });
    it("should return a three minute playlist", () => {
      const result = knapsack(catalog, 180);
      expect(result.seconds()).toBe(179);
      expect(result.averageRating()).toBe(3.5);
    });
    it("should return a four minute playlist", () => {
      const result = knapsack(catalog, 240);
      expect(result.seconds()).toBe(236);
      expect(result.averageRating()).toBe(4);
    });
    // skipped for now as this test takes a long time
    xit("should return a five minute playlist", () => {
      const result = knapsack(catalog, 300);
      expect(result.seconds()).toBe(300);
      expect(result.averageRating()).toBe(4.25);
    });
  });

  it("should return one hour long playlist", () => {
    // take 20 videos from the list and try to generate one hour of music

    const list = new Queue();
    list.merge(YoutubeMusic().slice(-20));

    const playlist = knapsack(list, 3600);

    expect(playlist.seconds()).toBe(2492);
    expect(playlist.averageRating()).toBe(3.92);
    expect(playlist.all().getAsArray()).toMatchSnapshot();
  });

  // these test cases are here to show the difference in playlist length when selecting different subset of videos
  // as we can see from the expected results, they do not match 100% with the desired playlist length. This will probably change once the playlist contains more items
  describe("variations on playlist", () => {
    describe("one hour playlist", () => {
      it("should return one hour long playlist, on a slice fom 0 to 20 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(0, 20));
        const playlist = knapsack(list, 3600);
        expect(playlist.seconds()).toBe(3549);
        expect(playlist.averageRating()).toBe(4.36);
      });
      it("should return one hour long playlist, on a slice fom 20 to 40 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(20, 40));
        const playlist = knapsack(list, 3600);
        expect(playlist.seconds()).toBe(2636);
        expect(playlist.averageRating()).toBe(3.88);
      });
      it("should return one hour long playlist, on a slice fom 40 to 60 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(40, 60));
        const playlist = knapsack(list, 3600);
        expect(playlist.seconds()).toBe(1764);
        expect(playlist.averageRating()).toBe(4.4);
      });
      it("should return one hour long playlist, on a slice fom 60 to 80 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(60, 80));
        const playlist = knapsack(list, 3600);
        expect(playlist.seconds()).toBe(3395);
        expect(playlist.averageRating()).toBe(4.6);
      });
    });

    describe("two hour playlist", () => {
      it("should return two hour long playlist, on a slice fom 0 to 20 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(0, 20));
        const playlist = knapsack(list, 3600 * 2);
        expect(playlist.seconds()).toBe(5198);
        expect(playlist.averageRating()).toBe(3.8);
      });
      it("should return two hour long playlist, on a slice fom 20 to 40 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(20, 40));
        const playlist = knapsack(list, 3600 * 2);
        expect(playlist.seconds()).toBe(5852);
        expect(playlist.averageRating()).toBe(2.75);
      });
      it("should return two hour long playlist, on a slice fom 40 to 60 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(40, 60));
        const playlist = knapsack(list, 3600 * 2);
        expect(playlist.seconds()).toBe(5948);
        expect(playlist.averageRating()).toBe(3.05);
      });
      it("should return two hour long playlist, on a slice fom 60 to 80 from music list", () => {
        const list = new Queue();
        list.merge(YoutubeMusic().slice(60, 80));
        const playlist = knapsack(list, 3600 * 2);
        expect(playlist.seconds()).toBe(6994);
        expect(playlist.averageRating()).toBe(3.85);
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
        const items: Queue = generateTestData(10, seconds);
        const playlist = knapsack(items, weight);
        expect(playlist.seconds()).toBe(weight);
      });
    });
  });

  // test commented because it's a bit slow
  // it("should return a two hour long playlist", () => {
  //   // take 30 videos from the list and try to generate two hours of music
  //   const list = new Queue();

  //   list.merge(YoutubeMusic().slice(-30));
  //   const playlist = knapsack(list, 3600 * 2);

  //   expect(playlist.seconds()).toBe(7167);
  // });
});
