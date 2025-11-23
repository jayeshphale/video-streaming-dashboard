import React, { useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import { useSyncController } from "../utils/syncController";

// Grid of 6 video players, passing refs for sync
const VideoGrid = ({ hlsUrls }) => {
  const videoRefs = useRef(Array(6).fill().map(() => React.createRef()));
  useSyncController(videoRefs);

  return (
    <div className="video-grid">
      {hlsUrls.map((url, idx) => (
        <VideoPlayer
          key={url}
          src={url}
          ref={videoRefs.current[idx]}
          label={`Stream ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export default VideoGrid;