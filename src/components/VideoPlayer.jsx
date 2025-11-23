import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";

// Forward ref to expose video element for sync
const VideoPlayer = forwardRef(({ src, label }, ref) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useImperativeHandle(ref, () => ({
    video: videoRef.current
  }));

  useEffect(() => {
    let hls;
    const video = videoRef.current;
    setStatus("loading");

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus("ready");
        video.play();
      });
      hls.on(Hls.Events.ERROR, () => setStatus("error"));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        setStatus("ready");
        video.play();
      });
    } else {
      setStatus("error");
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <div className="video-player">
      <div className="video-label">{label}</div>
      <video
        ref={videoRef}
        controls
        muted
        width="100%"
        height="auto"
        playsInline
        style={{ background: "#000" }}
      />
      <div className={`status-indicator ${status}`}>
        {status === "loading" && "Loading..."}
        {status === "ready" && "Ready"}
        {status === "error" && "Error"}
      </div>
    </div>
  );
});

export default VideoPlayer;