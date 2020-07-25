import React from "react";
import { create } from "react-test-renderer";

import AppPlayer from "./AppPlayer";

describe("AppPlayer", () => {
  it("should render", () => {
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating
        playlist={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test2", seconds: 60 },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried false", () => {
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating
        playlist={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test2", seconds: 60 },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with creating false", () => {
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried
        creating={false}
        playlist={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test2", seconds: 60 },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with generation tried and creating false", () => {
    const component = create(
      <AppPlayer
        playlistLength={120}
        generationTried={false}
        creating={false}
        playlist={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test2", seconds: 60 },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
