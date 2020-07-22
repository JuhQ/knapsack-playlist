import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import { act, create } from "react-test-renderer";

import EntertainmentSystem from "./EntertainmentSystem";

describe("EntertainmentSystem", () => {
  it("should render", () => {
    act(() => {
      const component = create(
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
  });

  it("should render difference", () => {
    act(() => {
      const component = create(
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
  });

  // tests skipped for now because of enzyme shallow testing doesn't act nice with useEffect. Need to come back to this
  xit("should call song changing function on player when current song ends", () => {
    act(() => {
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
  });

  xit("should call song changing function on playlist when changing song in playlist", () => {
    act(() => {
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
  });

  xit("should render playlist ended message once all the songs have been played", () => {
    let wrapper;
    act(() => {
      wrapper = shallow(
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
});
