import React from "react";

import { YoutubeItem } from "../../../types";

interface Props {
  item: YoutubeItem;
  onClick: (item: YoutubeItem) => void;
}

const PlaylistItem: React.FC<Props> = ({ item, onClick }: Props) => (
  <button type="button" onClick={() => onClick(item)}>
    <span>{item.title}</span>
    <span> - Length: </span>
    <span>{item.seconds}</span>
  </button>
);

export default PlaylistItem;
