import React from "react";
import VideoGrid from "./components/VideoGrid";

const HLS_URLS = [
  "/hls/stream1/index.m3u8",
  "/hls/stream2/index.m3u8",
  "/hls/stream3/index.m3u8",
  "/hls/stream4/index.m3u8",
  "/hls/stream5/index.m3u8",
  "/hls/stream6/index.m3u8"
];

function App() {
  return (
    <div className="app-container">
      <h1>Video Streaming Dashboard</h1>
      <VideoGrid hlsUrls={HLS_URLS} />
    </div>
  );
}

export default App;