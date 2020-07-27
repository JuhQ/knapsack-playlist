import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import Queue from "../../Datastructures/queue/queue";
import EntertainmentSystem from "./EntertainmentSystem";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    const list = new Queue();
    list.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test 2", seconds: 60 },
    ]);
    const component = create(<EntertainmentSystem list={list} length={120} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should end the first song", () => {
    const list = new Queue();
    list.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test 2", seconds: 60 },
    ]);
    const wrapper = shallow(<EntertainmentSystem list={list} length={120} />);

    wrapper.find("EntertainmentSystemContent").simulate("end");
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should end the last song of the list", () => {
    const list = new Queue();
    list.merge([{ id: "1", title: "test", seconds: 60 }]);

    const wrapper = shallow(<EntertainmentSystem list={list} length={120} />);
    wrapper.find("EntertainmentSystemContent").simulate("end");
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should render empty playlist message", () => {
    const wrapper = shallow(
      <EntertainmentSystem list={new Queue()} length={120} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("should end song on empty list", () => {
    const wrapper = shallow(
      <EntertainmentSystem list={new Queue()} length={120} />
    );

    wrapper.find("EntertainmentSystemContent").simulate("end");
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("should change song", () => {
    const list = new Queue();
    list.merge([
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test 2", seconds: 60 },
    ]);
    const wrapper = shallow(<EntertainmentSystem list={list} length={120} />);

    wrapper
      .find("EntertainmentSystemContent")
      .simulate("change", { id: "2", title: "test 2", seconds: 60 });
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
