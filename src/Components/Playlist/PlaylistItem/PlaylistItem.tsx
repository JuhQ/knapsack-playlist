import React from "react";
import { Item, Rating } from "semantic-ui-react";

import { YoutubeItem } from "../../../types";
import Duration from "../../Duration/Duration";

interface Props {
  item: YoutubeItem;
  onClick: (item: YoutubeItem) => void;
}

const PlaylistItem: React.FC<Props> = ({ item, onClick }: Props) => (
  <Item as="a" onClick={() => onClick(item)}>
    <Item.Image src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} />
    <Item.Content>
      <Item.Header>{item.title}</Item.Header>
      <Item.Meta>
        <Duration seconds={item.seconds} />
        <br />
        <span className="ratings-container">
          <Rating icon="star" rating={item.rating} maxRating={5} disabled />
        </span>
      </Item.Meta>
    </Item.Content>
  </Item>
);

export default PlaylistItem;
