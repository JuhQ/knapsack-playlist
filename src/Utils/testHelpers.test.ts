import generateTestData from "./testHelpers";

describe("Test helpers", () => {
  it("should generate test data", () => {
    expect(generateTestData(20, 20).all()).toMatchSnapshot();
  });
});
