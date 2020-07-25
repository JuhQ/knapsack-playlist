import "./PickerItem.css";

import React, { useState } from "react";
import { Item } from "semantic-ui-react";

import { YoutubeItem } from "../../../types";
import Duration from "../../Duration/Duration";

interface Props {
  item: YoutubeItem;
  onClick: (item: YoutubeItem) => void;
}

const PickerItem: React.FC<Props> = ({ item, onClick }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Item
      as="a"
      onClick={() => {
        setSelected(!selected);
        onClick(item);
      }}
      className={selected ? "picker-selected" : ""}
    >
      <Item.Image src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} />
      <Item.Content>
        <Item.Header>{item.title}</Item.Header>
        <Item.Meta>
          <Duration seconds={item.seconds} />
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};

export default PickerItem;
