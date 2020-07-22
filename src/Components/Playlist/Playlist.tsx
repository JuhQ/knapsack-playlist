import React from "react";

import { YoutubeItem } from "../../types";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

interface Props {
  list: YoutubeItem[];
  onChange: (item: YoutubeItem) => void;
}

const Playlist: React.FC<Props> = ({ list, onChange }: Props) => (
  <>
    {list.map((item) => (
      <PlaylistItem item={item} onClick={onChange} key={item.id} />
    ))}
  </>
);

export default Playlist;
