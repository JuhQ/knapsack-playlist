import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import renderer, { act } from "react-test-renderer";

import Picker from "./Picker";

const event = { preventDefault: jest.fn() };

describe("Picker", () => {
  beforeEach(() => {
    jest.spyOn(event, "preventDefault");
  });

  it("should render", () => {
    const component = renderer.create(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to call onSubmit function", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should be able to call onSubmit function and return a list of selected songs", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      length: 3600,
      list: [{ id: "2", seconds: 60, title: "test 2" }],
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to call filter list", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper
      .find("Input")
      .last()
      .simulate("change", { target: { value: "rammstein" } });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to call onSubmit function and return an empty list because selection was removed on the second click", () => {
    const handleSubmit = jest.fn();

    const wrapper = shallow(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={handleSubmit}
      />
    );

    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalledWith({ length: 3600, list: [] });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to submit with length", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Picker
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();

    wrapper
      .find("Input")
      .first()
      .simulate("change", { target: { value: 200 } });
    wrapper.find("PickerItem").last().simulate("click");

    wrapper.simulate("submit", event);

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      length: 200,
      list: [{ id: "2", seconds: 60, title: "test 2" }],
    });
  });
});
