import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Player from "./Player";

describe("Player", () => {
  it("should render", () => {
    const component = renderer.create(<Player id="1" onEnd={() => null} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to call onEnd function", () => {
    const handleOnEnd = jest.fn();
    const wrapper = shallow(<Player id="1" onEnd={handleOnEnd} />);
    expect(handleOnEnd).not.toHaveBeenCalled();
    wrapper.simulate("end");
    expect(handleOnEnd).toHaveBeenCalled();
  });
});
