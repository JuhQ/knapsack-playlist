import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Queue from "../../Datastructures/queue/queue";
import Generator from "./Generator";

describe("Generator", () => {
  it("should render", () => {
    const component = renderer.create(
      <Generator
        music={new Queue()}
        totalDataset={1200}
        totalLength={100000}
        onSubmit={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to call onSubmit function", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Generator
        music={new Queue()}
        totalDataset={1200}
        totalLength={100000}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("Form").simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      dataSetSize: 0,
      playlistLength: 0,
      music: {
        index: 0,
        list: [undefined],
      },
    });
  });

  describe("predefined values", () => {
    it("should be able to set dataset size by clicking button", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
          music={new Queue()}
          totalDataset={1200}
          totalLength={100000}
          onSubmit={handleSubmit}
        />
      );
      expect(handleSubmit).not.toHaveBeenCalled();
      wrapper.find("button.preset.dataset").last().simulate("click");
      wrapper.find("Form").simulate("submit");

      expect(handleSubmit).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith({
        dataSetSize: 1200,
        playlistLength: 0,
        music: {
          index: 0,
          list: [undefined],
        },
      });
    });

    it("should be able to set playlist length by clicking button", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
          music={new Queue()}
          totalDataset={1200}
          totalLength={100000}
          onSubmit={handleSubmit}
        />
      );
      expect(handleSubmit).not.toHaveBeenCalled();
      wrapper.find("button.preset.length").last().simulate("click");
      wrapper.find("Form").simulate("submit");

      expect(handleSubmit).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith({
        dataSetSize: 0,
        playlistLength: 100000,
        music: {
          index: 0,
          list: [undefined],
        },
      });
    });
  });
});
