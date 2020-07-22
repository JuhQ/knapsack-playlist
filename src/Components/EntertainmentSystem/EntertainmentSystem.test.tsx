import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import EntertainmentSystem from "./EntertainmentSystem";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    const component = renderer.create(
      <EntertainmentSystem
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call song changing function on player when current song ends", () => {
    const wrapper = shallow(
      <EntertainmentSystem
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
      />
    );

    wrapper.find("Player").simulate("end");
  });

  it("should call song changing function on playlist when changing song in playlist", () => {
    const wrapper = shallow(
      <EntertainmentSystem
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
      />
    );

    wrapper
      .find("Playlist")
      .simulate("change", { id: "2", title: "test 2", seconds: 60 });
  });
});
