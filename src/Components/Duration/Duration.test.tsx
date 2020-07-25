import React from "react";
import renderer from "react-test-renderer";

import Duration from "./Duration";

describe("Duration", () => {
  const values = [0, 10, 11, 30, 60, 61, 90, 100, 120, 121, 600, 3600];

  values.forEach((time) => {
    it(`should render ${time}`, () => {
      const component = renderer.create(<Duration seconds={time} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
