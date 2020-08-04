import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import renderer, { act } from "react-test-renderer";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import generateTestData from "../../Utils/testHelpers";
import Picker from "./Picker";

interface PaginationProps {
  prop: (
    value: string
  ) => (
    event: { preventDefault: () => null },
    result: { activePage: number }
  ) => null;
}

const event = { preventDefault: jest.fn() };

describe("Picker", () => {
  beforeEach(() => {
    jest.spyOn(event, "preventDefault");
  });

  it("should render", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const component = renderer.create(
      <Picker list={queue} onSubmit={() => null} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to call onSubmit function", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const handleSubmit = jest.fn();
    const wrapper = shallow(<Picker list={queue} onSubmit={handleSubmit} />);
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should be able to call onSubmit function and return a list of selected songs", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const handleSubmit = jest.fn();
    const wrapper = shallow(<Picker list={queue} onSubmit={handleSubmit} />);
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      length: 3600,
      list: {
        enqueue: expect.any(Function),
        list: {
          index: 1,
          list: [{ id: "2", seconds: 60, title: "test 2", rating: 1 }],
        },
      },
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to call filter list", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const handleSubmit = jest.fn();
    const wrapper = shallow(<Picker list={queue} onSubmit={handleSubmit} />);
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const handleSubmit = jest.fn();
    const wrapper = shallow(<Picker list={queue} onSubmit={handleSubmit} />);

    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.find("PickerItem").last().simulate("click");
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      length: 3600,
      list: {
        enqueue: expect.any(Function),
        list: {
          index: 0,
          list: [undefined],
        },
      },
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to submit with length", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);

    const handleSubmit = jest.fn();
    const wrapper = shallow(<Picker list={queue} onSubmit={handleSubmit} />);
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
      list: {
        enqueue: expect.any(Function),
        list: {
          index: 1,
          list: [{ id: "2", seconds: 60, title: "test 2", rating: 1 }],
        },
      },
    });
  });

  it("should render multiple items with pagination", () => {
    const wrapper = shallow(
      <Picker list={generateTestData(30, 20)} onSubmit={() => null} />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("should be able change page", () => {
    const wrapper = shallow(
      <Picker list={generateTestData(30, 20)} onSubmit={() => null} />
    );

    act(() => {
      // simulate does not work here :(
      const pagination: PaginationProps = wrapper.find("Pagination");
      pagination.prop("onPageChange")(event, { activePage: 2 });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
