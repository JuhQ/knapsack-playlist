import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import App from "./App";

describe("App", () => {
  it("should render", () => {
    const component = create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render second tab", () => {
    const component = create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render third tab", () => {
    const component = create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should submit empty dataset size and playlist length", () => {
    const wrapper = shallow(<App />);
    wrapper
      .find("Generator")
      .simulate("submit", { dataSetSize: 0, playlistLength: 0 });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit only length", () => {
    const wrapper = shallow(<App />);
    wrapper
      .find("Generator")
      .simulate("submit", { dataSetSize: 0, playlistLength: 10 });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit only dataset size", () => {
    const wrapper = shallow(<App />);
    wrapper
      .find("Generator")
      .simulate("submit", { dataSetSize: 10, playlistLength: 0 });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit proper dataset size and playlist length", () => {
    const wrapper = shallow(<App />);
    wrapper
      .find("Generator")
      .simulate("submit", { dataSetSize: 5, playlistLength: 3600 });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should be able to use picker to generate custom dataset for playlist generation", () => {
    const wrapper = shallow(<App />);
    wrapper.find("Picker").simulate("submit", [
      { id: "1", title: "test", seconds: 60 },
      { id: "2", title: "test2", seconds: 60 },
    ]);

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe("initial values", () => {
    it("should render notice about no playlist generated", () => {
      const component = create(
        <App
          initialPlaylistLength={100}
          initialPlaylist={[]}
          initialGeneratorSubmitted
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should submit only length", () => {
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={[{ id: "1", title: "test", seconds: 2 }]}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper
        .find("Generator")
        .simulate("submit", { dataSetSize: 0, playlistLength: 10 });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });

    it("should submit only dataset size", () => {
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={[{ id: "1", title: "test", seconds: 2 }]}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper
        .find("Generator")
        .simulate("submit", { dataSetSize: 10, playlistLength: 0 });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });

    it("should submit proper dataset size and playlist length", () => {
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={[{ id: "1", title: "test", seconds: 2 }]}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper.find("Generator").simulate("submit", {
        value: { dataSetSize: 5, playlistLength: 3600 },
      });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
  });
});
