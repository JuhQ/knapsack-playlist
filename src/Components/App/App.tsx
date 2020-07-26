/* eslint-disable react/require-default-props */
import "./App.css";

import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import knapsack from "../../Algorithms/knapsack/knapsack";
import YoutubeMusic from "../../Models/Youtube/Youtube";
import { YoutubeItem } from "../../types";
import { sumSeconds } from "../../Utils/math";
import sample from "../../Utils/utils";
import Generator from "../Generator/Generator";
import Picker from "../Picker/Picker";
import AppPlayer from "./AppPlayer/AppPlayer";
import AppTitle from "./AppTitle/AppTitle";

interface Props {
  initialPlaylistLength?: number;
  initialCreating?: boolean;
  initialPlaylist?: YoutubeItem[];
  initialGeneratorSubmitted?: boolean;
}

const music = YoutubeMusic();

const App: React.FC<Props> = ({
  initialPlaylistLength = 0,
  initialCreating = false,
  initialPlaylist = [],
  initialGeneratorSubmitted = false,
}: Props) => {
  const [playlistLength, setPlaylistLength] = useState<number>(
    initialPlaylistLength
  );
  const [playlist, setPlaylist] = useState<YoutubeItem[]>(initialPlaylist);
  const [creating, setCreating] = useState<boolean>(initialCreating);
  const [generatorSubmitted, setGeneratorSubmitted] = useState<boolean>(
    initialGeneratorSubmitted
  );
  const [musicList, setMusicList] = useState<YoutubeItem[]>([]);
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
          totalLength={sumSeconds(music)}
          totalDataset={music.length}
          onSubmit={(value) => {
            setCreating(true);
            setPlaylistLength(value.playlistLength);
            setMusicList(sample(music, value.dataSetSize));
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
