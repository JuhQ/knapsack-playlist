/* eslint-disable react/require-default-props */
import "./App.css";

import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import knapsack from "../../Algorithms/knapsack/knapsack";
import Queue from "../../Datastructures/queue/queue";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import sample from "../../Utils/utils";
import Generator from "../Generator/Generator";
import Picker from "../Picker/Picker";
import AppPlayer from "./AppPlayer/AppPlayer";
import AppTitle from "./AppTitle/AppTitle";

interface Props {
  initialPlaylistLength?: number;
  initialCreating?: boolean;
  initialPlaylist?: Queue;
  initialGeneratorSubmitted?: boolean;
}

const music = YoutubeMusic();

const App: React.FC<Props> = ({
  initialPlaylistLength = 0,
  initialCreating = false,
  initialPlaylist = new Queue(),
  initialGeneratorSubmitted = false,
}: Props) => {
  const [playlistLength, setPlaylistLength] = useState<number>(
    initialPlaylistLength
  );
  const [playlist, setPlaylist] = useState<Queue>(initialPlaylist);
  const [creating, setCreating] = useState<boolean>(initialCreating);
  const [generatorSubmitted, setGeneratorSubmitted] = useState<boolean>(
    initialGeneratorSubmitted
  );
  const [musicList, setMusicList] = useState<Queue>(new Queue());
  const [generationTried, setGenerationTried] = useState<boolean>(false);

  useEffect(() => {
    if (generatorSubmitted) {
      setPlaylist(knapsack(musicList, playlistLength));
      setCreating(false);
      setGeneratorSubmitted(false);
      setGenerationTried(true);
    }
  }, [generatorSubmitted, musicList, playlistLength]);

  return (
    <Grid>
      <Grid.Column width={16}>
        <AppTitle />
      </Grid.Column>
      <Grid.Column width={16}>
        <Generator
          totalLength={music.seconds()}
          totalDataset={music.length()}
          onSubmit={(value) => {
            setCreating(true);
            setPlaylistLength(value.playlistLength);

            const sampledList = sample(music.all(), value.dataSetSize);
            const sampledQueue = new Queue();
            sampledQueue.merge(sampledList);

            setMusicList(sampledQueue);
            setGeneratorSubmitted(true);
          }}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Grid>
          <Grid.Column computer={5} mobile={16}>
            <Picker
              list={music}
              onSubmit={({ list, length }) => {
                setCreating(true);
                setMusicList(list);
                setPlaylistLength(length);
                setGeneratorSubmitted(true);
              }}
            />
          </Grid.Column>
          <Grid.Column computer={11} mobile={16}>
            <AppPlayer
              playlistLength={playlistLength}
              generationTried={generationTried}
              creating={creating}
              playlist={playlist}
            />
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <Grid.Column width={16}>
        <span className="security">Knapsack generated playlists rule!</span>
      </Grid.Column>
    </Grid>
  );
};

export default App;
