import React from "react";
import { create } from "react-test-renderer";

import AppTitle from "./AppTitle";

describe("AppTitle", () => {
  it("should render", () => {
    const component = create(<AppTitle />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
