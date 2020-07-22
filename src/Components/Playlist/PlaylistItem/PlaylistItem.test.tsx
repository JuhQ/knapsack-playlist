import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import PlaylistItem from "./PlaylistItem";

describe("PlaylistItem", () => {
  it("should render", () => {
    const component = renderer.create(
      <PlaylistItem
        item={{ id: "1", title: "test", seconds: 60 }}
        onClick={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to call onClick function", () => {
    const handleOnClick = jest.fn();
    const wrapper = shallow(
      <PlaylistItem
        item={{ id: "1", title: "test", seconds: 60 }}
        onClick={handleOnClick}
      />
    );
    expect(handleOnClick).not.toHaveBeenCalled();
    wrapper.simulate("click");
    expect(handleOnClick).toHaveBeenCalled();
  });
});
