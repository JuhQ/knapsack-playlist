import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
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
        length={120}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render difference", () => {
    const component = renderer.create(
      <EntertainmentSystem
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        length={130}
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
        length={120}
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
        length={120}
      />
    );

    wrapper
      .find("Playlist")
      .simulate("change", { id: "2", title: "test 2", seconds: 60 });
  });

  it("should render playlist ended message once all the songs have been played", () => {
    const wrapper = shallow(
      <EntertainmentSystem
        list={[
          { id: "1", title: "test", seconds: 60 },
          { id: "2", title: "test 2", seconds: 60 },
        ]}
        length={120}
      />
    );

    wrapper.find("Player").simulate("end");
    wrapper.find("Player").simulate("end");
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
