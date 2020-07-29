import ArrayList from "../Datastructures/ArrayList/ArrayList";
import { YoutubeItem } from "../types";
import sample from "./utils";

describe("utils", () => {
  it("should sample list", () => {
    const list = new ArrayList<YoutubeItem>(7);
    list.push({ title: "test", seconds: 100, id: "test" });
    list.push({ title: "test1", seconds: 100, id: "test1" });
    list.push({ title: "test2", seconds: 100, id: "test2" });
    list.push({ title: "test3", seconds: 100, id: "test3" });
    list.push({ title: "test4", seconds: 100, id: "test4" });
    list.push({ title: "test5", seconds: 100, id: "test5" });
    list.push({ title: "test6", seconds: 100, id: "test6" });

    expect(sample(list, 3)).not.toEqual(list);
    expect(sample(list, 3).size()).toEqual(3);
  });
});
