import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import EntertainmentSystem from "./EntertainmentSystem";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60 });
    list.push({ id: "2", title: "test 2", seconds: 60 });
    const queue = new Queue();
    queue.merge(list);
    const component = create(<EntertainmentSystem list={queue} length={120} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should end the first song", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60 });
    list.push({ id: "2", title: "test 2", seconds: 60 });
    const queue = new Queue();
    queue.merge(list);
    const wrapper = shallow(<EntertainmentSystem list={queue} length={120} />);

    wrapper.find("EntertainmentSystemContent").simulate("end");
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should end the last song of the list", () => {
    const list = new ArrayList<YoutubeItem>(1);
    list.push({ id: "1", title: "test", seconds: 60 });
    const queue = new Queue();
    queue.merge(list);

    const wrapper = shallow(<EntertainmentSystem list={queue} length={120} />);
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60 });
    list.push({ id: "2", title: "test 2", seconds: 60 });
    const queue = new Queue();
    queue.merge(list);
    const wrapper = shallow(<EntertainmentSystem list={queue} length={120} />);

    wrapper
      .find("EntertainmentSystemContent")
      .simulate("change", { id: "2", title: "test 2", seconds: 60 });
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
