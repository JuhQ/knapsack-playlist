import "./Picker.css";

import React, { useState } from "react";
import { Input, Item, Pagination } from "semantic-ui-react";

import ArrayList from "../../Datastructures/ArrayList/ArrayList";
import Queue from "../../Datastructures/queue/queue";
import { YoutubeItem } from "../../types";
import PickerItem from "./PickerItem/PickerItem";

interface SubmitReturn {
  list: Queue;
  length: number;
}

interface Props {
  list: Queue;
  onSubmit: ({ list }: SubmitReturn) => void;
}

const Picker: React.FC<Props> = ({ list, onSubmit }: Props) => {
  const [playlistLength, setPlaylistLength] = useState<number>(3600);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedQueue, setSelectedQueue] = useState<Queue>(new Queue());

  const handleSelection = (item: YoutubeItem) => {
    const itemFound = selectedQueue.all().find(({ id }) => item.id === id);
    const queue = new Queue();

    if (itemFound) {
      const filteredQueue = selectedQueue
        .all()
        .filter(({ id }) => id !== item.id);

      queue.merge(filteredQueue);
    } else {
      queue.merge(selectedQueue);
      queue.enqueue(item);
    }

    setSelectedQueue(queue);
  };

  const filteredQueue = list
    .all()
    .filter((item) =>
      search.length
        ? item.title.toLowerCase().includes(search.toLowerCase())
        : true
    );

  const filteredList = new ArrayList<YoutubeItem>(filteredQueue.size());
  for (let i = 0; i < filteredQueue.size(); i++) {
    filteredList.push(filteredQueue.at(i));
  }

  const itemsPerPage = 10;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ list: selectedQueue, length: playlistLength });
      }}
    >
      <h2>Option 2:</h2>
      <h3>Define desired playlist length and pick your music</h3>
      <small>
        Playlist will be generated from the sample of music you picked. The
        algorithm will try generate the highest quality playlist, which will not
        exceed the given length.
      </small>
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
      List duration {selectedQueue.seconds()}
      <br />
      List size {selectedQueue.length()}
      <br />
      <Input
        type="search"
        placeholder="Search"
        onChange={({ target }) => {
          setSearch(target.value);
          setCurrentPage(0);
        }}
      />
      <div className="picker-container">
        <Pagination
          activePage={currentPage + 1}
          totalPages={Math.ceil(filteredList.size() / itemsPerPage)}
          onPageChange={(event, { activePage }) => {
            setCurrentPage(Number(activePage) - 1);
          }}
        />
        <Item.Group>
          {filteredList
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map((item) => (
              <PickerItem
                item={item}
                selected={
                  selectedQueue.all().find(({ id }) => item.id === id) !==
                  undefined
                }
                onClick={() => handleSelection(item)}
                key={item.id}
              />
            ))
            .getAsArray()}
        </Item.Group>
      </div>
    </form>
  );
};

export default Picker;
