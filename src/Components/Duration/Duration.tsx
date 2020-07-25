import React from "react";

interface Props {
  seconds: number;
}

const Duration: React.FC<Props> = ({ seconds }: Props) => {
  const minutes = Math.floor(seconds / 60);
  const secondsCounted = seconds - minutes * 60;

  const minutesString =
    minutes > 0 ? `${minutes} minute${minutes !== 1 ? "s" : ""}` : "";

  const secondsString =
    secondsCounted > 0
      ? `${secondsCounted} second${secondsCounted !== 1 ? "s" : ""}`
      : "";

  return (
    <>
      {minutesString} {secondsString}
    </>
  );
};

export default Duration;
