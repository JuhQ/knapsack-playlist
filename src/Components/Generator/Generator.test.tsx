import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Generator from "./Generator";

describe("Generator", () => {
  it("should render", () => {
    const component = renderer.create(
      <Generator
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
        totalDataset={1200}
        totalLength={100000}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    wrapper.find("Form").simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      dataSetSize: 20,
      playlistLength: 3600,
    });
  });

  it("should be able to call onSubmit function with changed values", () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(
      <Generator
        totalDataset={1200}
        totalLength={100000}
        onSubmit={handleSubmit}
      />
    );
    expect(handleSubmit).not.toHaveBeenCalled();

    wrapper
      .find("Input")
      .first()
      .simulate("change", { target: { value: 200 } });
    wrapper
      .find("Input")
      .last()
      .simulate("change", { target: { value: 36000 } });

    wrapper.find("Form").simulate("submit");

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith({
      dataSetSize: 200,
      playlistLength: 36000,
    });
  });

  describe("inputs", () => {
    it("should be able to call onChange function on the dataset size input", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
          totalDataset={1200}
          totalLength={100000}
          onSubmit={handleSubmit}
        />
      );
      expect(handleSubmit).not.toHaveBeenCalled();
      wrapper
        .find("Input")
        .first()
        .simulate("change", { target: { value: 200 } });
      wrapper.find("Form").simulate("submit");

      expect(handleSubmit).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith({
        dataSetSize: 200,
        playlistLength: 3600,
      });
    });

    it("should be able to call onChange function on the playlist length input", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
          totalDataset={1200}
          totalLength={100000}
          onSubmit={handleSubmit}
        />
      );
      expect(handleSubmit).not.toHaveBeenCalled();
      wrapper
        .find("Input")
        .last()
        .simulate("change", { target: { value: 200 } });
      wrapper.find("Form").simulate("submit");

      expect(handleSubmit).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith({
        dataSetSize: 20,
        playlistLength: 200,
      });
    });
  });

  describe("predefined values", () => {
    it("should be able to set dataset size by clicking button", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
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
        playlistLength: 3600,
      });
    });

    it("should be able to set playlist length by clicking button", () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(
        <Generator
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
        dataSetSize: 20,
        playlistLength: 100000,
      });
    });
  });
});
