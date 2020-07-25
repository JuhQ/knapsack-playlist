import React from "react";
import { Container } from "semantic-ui-react";

import { YoutubeItem } from "../../../types";
import EntertainmentSystem from "../../EntertainmentSystem/EntertainmentSystem";

interface Props {
  playlistLength: number;
  generationTried: boolean;
  creating: boolean;
  playlist: YoutubeItem[];
}

const AppPlayer: React.FC<Props> = ({
  playlistLength,
  generationTried,
  creating,
  playlist,
}: Props) => (
  <Container>
    {playlistLength === 0 && (
      <>Select dataset size and desired playlist length</>
    )}

    {playlistLength > 0 &&
      generationTried &&
      !creating &&
      !playlist?.length && <>Playlist generated but no songs were found</>}

    {creating && (
      <>
        Generating playlist. Depending on input size and desired playlist
        length, this might take a while.
      </>
    )}
    {playlistLength > 0 && playlist && playlist.length > 0 && (
      <EntertainmentSystem list={playlist} length={playlistLength} />
    )}
  </Container>
);

export default AppPlayer;
