import React from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ width = "100%", height = "100%", url }) => {
  return (
    <div>
      <ReactPlayer src={url} width={"100%"} height={"100%"} />
    </div>
  );
};

export default VideoPlayer;
