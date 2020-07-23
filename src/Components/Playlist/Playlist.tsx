import "./Playlist.css";

import React from "react";
import { Item } from "semantic-ui-react";

import { YoutubeItem } from "../../types";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

interface Props {
  list: YoutubeItem[];
  onChange: (item: YoutubeItem) => void;
}

const Playlist: React.FC<Props> = ({ list, onChange }: Props) => (
  <div className="playlist">
    <Item.Group>
      {list.map((item) => (
        <PlaylistItem item={item} onClick={onChange} key={item.id} />
      ))}
    </Item.Group>
  </div>
);

export default Playlist;