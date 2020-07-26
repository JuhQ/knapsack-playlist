import YoutubeMusic from "./Youtube";

describe("YouTube model", () => {
  it("should return list of music", () => {
    expect(YoutubeMusic().all()).toMatchSnapshot();
  });
});
