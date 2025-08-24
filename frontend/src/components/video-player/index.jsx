import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ width = "100%", height = "100%", url }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControlls, setShowControlls] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controllsTimeOutRef = useRef(null);

  const handlePlayAndPuse = () => {
    setPlaying(!playing);
  };
  return (
    <div>
      <ReactPlayer src={url} width={"100%"} height={"100%"} />
    </div>
  );
};

export default VideoPlayer;
