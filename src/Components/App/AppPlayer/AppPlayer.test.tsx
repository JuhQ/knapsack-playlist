import React from "react";
import { create } from "react-test-renderer";

import ArrayList from "../../../Datastructures/ArrayList/ArrayList";
import Queue from "../../../Datastructures/queue/queue";
import { YoutubeItem } from "../../../types";
import AppPlayer from "./AppPlayer";

describe("AppPlayer", () => {
  it("should render", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test AppPlayer", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test2 AppPlayer", seconds: 60, rating: 1 });
    const playlist = new Queue();
    playlist.merge(list);

    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render select dataset message", () => {
    const playlist = new Queue();

    const component = create(
      <AppPlayer
        playlistLength={0}
        generationTried
        creating
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render select dataset message even when genration is false", () => {
    const playlist = new Queue();

    const component = create(
      <AppPlayer
        playlistLength={1}
        generationTried={false}
        creating={false}
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried false", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test AppPlayer", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test2 AppPlayer", seconds: 60, rating: 1 });
    const playlist = new Queue();
    playlist.merge(list);

    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with creating false", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test AppPlayer", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test2 AppPlayer", seconds: 60, rating: 1 });
    const playlist = new Queue();
    playlist.merge(list);

    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating={false}
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried and creating false", () => {
    const list = new ArrayList<YoutubeItem>(2);
    list.push({ id: "1", title: "test AppPlayer", seconds: 60, rating: 1 });
    list.push({ id: "2", title: "test2 AppPlayer", seconds: 60, rating: 1 });
    const playlist = new Queue();
    playlist.merge(list);

    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating={false}
        playlist={playlist}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
