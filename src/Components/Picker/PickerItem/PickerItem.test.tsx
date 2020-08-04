import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import renderer from "react-test-renderer";

import PickerItem from "./PickerItem";

describe("PickerItem", () => {
  it("should render", () => {
    const component = renderer.create(
      <PickerItem
        item={{ id: "1", title: "test", seconds: 60, rating: 1 }}
        onClick={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to select item", () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <PickerItem
        item={{ id: "2", title: "test 2", seconds: 60, rating: 1 }}
        onClick={handleClick}
      />
    );
    expect(handleClick).not.toHaveBeenCalled();
    wrapper.simulate("click");
    expect(handleClick).toHaveBeenCalled();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
