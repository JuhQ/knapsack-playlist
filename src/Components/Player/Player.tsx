import React from "react";
import YouTube from "react-youtube";

interface Props {
  id: string;
  onEnd: () => void;
}

const Player: React.FC<Props> = ({ id, onEnd }: Props) => (
  <YouTube videoId={id} onEnd={onEnd} opts={{ playerVars: { autoplay: 1 } }} />
);

export default Player;
