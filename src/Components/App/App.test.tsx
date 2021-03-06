import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
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
    wrapper.find("Generator").simulate("submit", {
      dataSetSize: 0,
      playlistLength: 0,
      music: new Queue().all(),
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit only length", () => {
    const wrapper = shallow(<App />);
    wrapper.find("Generator").simulate("submit", {
      dataSetSize: 0,
      playlistLength: 10,
      music: new Queue().all(),
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit only dataset size", () => {
    const wrapper = shallow(<App />);
    wrapper.find("Generator").simulate("submit", {
      dataSetSize: 10,
      playlistLength: 0,
      music: new Queue().all(),
    });

    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  it("should submit proper dataset size and playlist length", () => {
    const wrapper = shallow(<App />);
    wrapper.find("Generator").simulate("submit", {
      dataSetSize: 5,
      playlistLength: 3600,
      music: new ArrayList(0),
    });

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
          initialPlaylist={new Queue()}
          initialGeneratorSubmitted
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should submit only length", () => {
      const list = new ArrayList<YoutubeItem>(1);
      list.push({ id: "1", title: "test", seconds: 2, rating: 1 });
      const playlist = new Queue();
      playlist.merge(list);
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={playlist}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper.find("Generator").simulate("submit", {
        dataSetSize: 0,
        playlistLength: 10,
        music: list,
      });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });

    it("should submit only dataset size", () => {
      const list = new ArrayList<YoutubeItem>(1);
      list.push({ id: "1", title: "test", seconds: 2, rating: 1 });
      const playlist = new Queue();
      playlist.merge(list);
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={playlist}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper.find("Generator").simulate("submit", {
        dataSetSize: 10,
        playlistLength: 0,
        music: list,
      });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });

    it("should submit proper dataset size and playlist length", () => {
      const list = new ArrayList<YoutubeItem>(1);
      list.push({ id: "1", title: "test", seconds: 2, rating: 1 });
      const playlist = new Queue();
      playlist.merge(list);
      const wrapper = shallow(
        <App
          initialPlaylistLength={100}
          initialPlaylist={playlist}
          initialGeneratorSubmitted
          initialCreating
        />
      );
      wrapper.find("Generator").simulate("submit", {
        dataSetSize: 5,
        playlistLength: 3600,
        music: list,
      });

      act(() => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
  });
});
