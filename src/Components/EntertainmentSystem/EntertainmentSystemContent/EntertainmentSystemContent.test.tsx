import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import ArrayList from "../../../Datastructures/ArrayList/ArrayList";
import Queue from "../../../Datastructures/queue/queue";
import { YoutubeItem } from "../../../types";
import EntertainmentSystemContent from "./EntertainmentSystemContent";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(1);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);

    const component = create(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 60, rating: 1 }}
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 55, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(1);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);
    const component = create(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 55, rating: 1 }}
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 55, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(1);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);
    const handleChange = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 55, rating: 1 }}
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 55, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(1);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);
    const handleEnd = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 55, rating: 1 }}
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
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 55, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(2);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);
    const handleChange = jest.fn();
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 55, rating: 1 }}
        length={120}
        diff={5}
        playlistLength={115}
        onEnd={() => null}
        onChange={handleChange}
      />
    );

    wrapper
      .find("Playlist")
      .simulate("change", { id: "2", title: "test 2", seconds: 60, rating: 1 });

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render playlist ended message once all the songs have been played", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test", seconds: 55, rating: 1 });
    list.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const list2 = new ArrayList<YoutubeItem>(1);
    list2.push({ id: "2", title: "test 2", seconds: 60, rating: 1 });
    const queue = new Queue();
    queue.merge(list);
    const playlist = new Queue();
    playlist.merge(list2);
    const wrapper = shallow(
      <EntertainmentSystemContent
        list={queue}
        playlist={playlist}
        currentSong={{ id: "1", title: "test", seconds: 55, rating: 1 }}
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
