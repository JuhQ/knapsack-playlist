import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import EntertainmentSystemContent from "./EntertainmentSystemContent";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    const component = create(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 60 }}
        length={120}
        diff={0}
        playlistLength={120}
        onEnd={() => null}
        onChange={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render diff", () => {
    const component = create(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 55 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 55 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={() => null}
        onChange={() => null}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call song changing function on player when current song ends", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 55 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 55 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={() => null}
        onChange={handleChange}
      />
    );

    wrapper.find("Playlist").simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

  it("should call end function on player when current song ends", () => {
    const handleEnd = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 55 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 55 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={handleEnd}
        onChange={() => null}
      />
    );

    wrapper.find("Player").simulate("end");
    expect(handleEnd).toHaveBeenCalled();
  });

  it("should call song changing function on playlist when changing song in playlist", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 55 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 55 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={() => null}
        onChange={handleChange}
      />
    );

    wrapper
      .find("Playlist")
      .simulate("change", { id: "2", title: "test 2", seconds: 60 });

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render playlist ended message once all the songs have been played", () => {
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={[
          { id: "1", title: "test", seconds: 55 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        playlist={[{ id: "2", title: "test 2", seconds: 60 }]}
        currentSong={{ id: "1", title: "test", seconds: 55 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={() => null}
        onChange={() => null}
      />
    );

    wrapper.find("Player").simulate("end");
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    act(() => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});