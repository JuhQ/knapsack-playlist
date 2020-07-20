import { YoutubeMusic, YoutubeAudiobooks } from "./Youtube";

describe("YouTube model", () => {
  it("should return list of audiobooks", () => {
    expect(YoutubeAudiobooks()).toMatchSnapshot();
  });

  it("should return list of music", () => {
    expect(YoutubeMusic()).toMatchSnapshot();
  });
});
