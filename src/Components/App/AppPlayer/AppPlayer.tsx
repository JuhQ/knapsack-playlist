import React from "react";
import { Container } from "semantic-ui-react";

import Queue from "../../../Datastructures/queue/queue";
import EntertainmentSystem from "../../EntertainmentSystem/EntertainmentSystem";

interface Props {
  playlistLength: number;
  generationTried: boolean;
  creating: boolean;
  playlist: Queue;
}

const AppPlayer: React.FC<Props> = ({
  playlistLength,
  generationTried,
  creating,
  playlist,
}: Props) => (
  <Container>
    <h2>The playlist will be generated here.</h2>
    <p>
      Either select randomised sample data with the buttons above, or select
      music to your playlist on the left.
    </p>
    <p>
      In either case, the knapsack algorithm will try to generate a playlist
      which of the highest quality and as close as possible with the given
      length. But be aware, quality will override length in determine the
      playlist content, and therefore the playlist might not be as long as you
      hoped.
    </p>
    {playlistLength === 0 && (
      <>Select dataset size and desired playlist length</>
    )}

    {playlistLength > 0 &&
      generationTried &&
      !creating &&
      !playlist.length() && <>Playlist generated but no songs were found</>}

    {creating && (
      <>
        <h2>Generating playlist.</h2>
        Depending on input size and desired playlist length, this might take a
        while.
      </>
    )}
    {playlistLength > 0 && playlist && playlist.length() > 0 && (
      <EntertainmentSystem list={playlist} length={playlistLength} />
    )}
  </Container>
);

export default AppPlayer;
