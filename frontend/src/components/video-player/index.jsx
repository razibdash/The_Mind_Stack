import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

export default function VideoPlayer({ url, width, height }) {
  return (
    <MediaController
      style={{
        width: width || "100%",
        backgroundColor: "black",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* ✅ Native <video> for Cloudinary playback */}
      <video
        slot="media"
        src={url}
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: height || "100%",
          objectFit: "cover",
        }}
      />

      {/* ✅ Custom Controls */}
      <MediaControlBar>
        <MediaPlayButton />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
        <MediaFullscreenButton />
      </MediaControlBar>
    </MediaController>
  );
}
