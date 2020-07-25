import "./Picker.css";

import React, { useState } from "react";
import { Input, Item } from "semantic-ui-react";

import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import PickerItem from "./PickerItem/PickerItem";

interface SubmitReturn {
  list: YoutubeItem[];
  length: number;
}

interface Props {
  list: YoutubeItem[];
  onSubmit: ({ list }: SubmitReturn) => void;
}

const Picker: React.FC<Props> = ({ list, onSubmit }: Props) => {
  const [playlistLength, setPlaylistLength] = useState<number>(3600);
  const [search, setSearch] = useState<string>("");
  const [selectedList, setSelectedList] = useState<YoutubeItem[]>([]);

  const handleSelection = (item: YoutubeItem) => {
    const itemFound = selectedList.find(({ id }) => item.id === id);

    if (itemFound) {
      setSelectedList(selectedList.filter(({ id }) => id !== item.id));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const length = sumSeconds(selectedList);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ list: selectedList, length: playlistLength });
      }}
    >
      <h3>Define desired playlist length and pick your music</h3>
      <Input
        size="large"
        type="number"
        label={{ basic: true, content: "seconds" }}
        labelPosition="right"
        placeholder="Enter desired playlist length"
        value={playlistLength}
        onChange={({ target }) => {
          setPlaylistLength(Number(target.value));
        }}
      />
      <br />
      <button type="submit" className="picker-submit">
        Click here to generate the playlist from music you picked
      </button>
      <br />
      <small>
        Depending on the size of the set you pick, and the length of the
        playlist you set, the generated playlist may or may not include all the
        songs you picked.
      </small>
      <br />
      List duration {length}
      <br />
      List size {selectedList.length}
      <br />
      <Input
        type="search"
        placeholder="Search"
        onChange={({ target }) => {
          setSearch(target.value);
        }}
      />
      <div className="picker-container">
        <Item.Group>
          {list
            .filter((item) =>
              search.length
                ? item.title.toLowerCase().includes(search.toLowerCase())
                : true
            )
            .map((item) => (
              <PickerItem
                item={item}
                onClick={() => handleSelection(item)}
                key={item.id}
              />
            ))}
        </Item.Group>
      </div>
    </form>
  );
};

export default Picker;
