# Video Streaming Dashboard (React + HLS)

A synchronized multi-view streaming dashboard built with React and HLS.js.  
Displays 6 streams in a responsive grid and keeps them tightly synchronized.

---

## 1. Overview

This dashboard demonstrates:
- RTSP → HLS conversion using MediaMTX or FFmpeg
- Simulating 6 distinct HLS endpoints from a single RTSP source
- React-based multi-player grid with hls.js
- Real-time video synchronization logic

---

## 2. HLS Generation Pipeline

### RTSP Source

**Provided RTSP URL:**  
`rtsp://13.60.76.79:8554/live`

### HLS Generation

**Recommended Tool:** [MediaMTX](https://github.com/bluenviron/mediamtx)  
(FFmpeg can also be used)

**How it works:**
- MediaMTX reads the RTSP stream and outputs HLS for multiple paths (cam1..cam6).
- Each path creates a unique HLS URL (`/hls/cam1/index.m3u8`, ... `/hls/cam6/index.m3u8`).

**Example MediaMTX configuration (`mediamtx.yml`):**
```yaml
paths:
  cam1:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam2:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam3:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam4:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam5:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam6:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
```

**Alternative with FFmpeg (for each stream):**
```sh
ffmpeg -rtsp_transport tcp -i rtsp://13.60.76.79:8554/live \
  -c:v copy -c:a aac -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
  ./hls/stream1/index.m3u8
```
Repeat for `stream2` ... `stream6`.

**Testing Alternative:**  
If the RTSP source is not accessible, use public HLS test URLs:
```js
const videoSources = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
];
```

---

## 3. React Dashboard Development

- **Framework:** React (functional components + Hooks)
- **Player Library:** [hls.js](https://github.com/video-dev/hls.js)
- **Layout:** Responsive grid (3x2 or 2x3), mobile-friendly
- **Synchronization:**  
  - The first video acts as the master reference.
  - Every 0.5s, all other videos are nudged forward or paused to keep drift < 0.3s.
  - Synchronization is handled by a custom React hook (`syncController`).

---

## 4. Local Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/jayeshphale/video-dashboard.git
    cd video-dashboard
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start MediaMTX (ensure `mediamtx.yml` is present):**
    ```sh
    ./mediamtx.exe
    ```

4. **Start the React app:**
    ```sh
    npm start
    ```

5. **Open in your browser:**  
   [http://localhost:3000](http://localhost:3000)

---

## 5. Deployment

- Push your repository to GitHub.
- Deploy to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- If MediaMTX is not public, replace HLS URLs with public test streams.
- **Live Demo:**  
  [https://video-dashboard-seven.vercel.app/](https://video-dashboard-seven.vercel.app/)

---

## 6. Synchronization Logic

- The dashboard uses a custom sync controller to keep all video players within 0.3 seconds of each other.
- The master player's `currentTime` is used as the reference.
- If any player drifts too far behind, it is nudged forward; if ahead, it is briefly paused.
- For production, consider advanced techniques (PTS alignment, CMAF, WebRTC).

---

## 7. File Structure

```
src/
  components/
    VideoGrid.jsx
    VideoPlayer.jsx
  utils/
    syncController.js
  App.jsx
  index.js
  styles.css
```

---

## 8. References

- Dashboard layout: [monitor.theun1t.com](https://monitor.theun1t.com/)
- MediaMTX: [github.com/bluenviron/mediamtx](https://github.com/bluenviron/mediamtx)
- hls.js: [github.com/video-dev/hls.js](https://github.com/video-dev/hls.js)

---

## 📦 Deliverables

- **Dashboard Code:** [GitHub Repository](https://github.com/jayeshphale/video-streaming-dashboard)
- **README.md:** This file contains all technical documentation.
- **Live Link:** (https://video-streaming-dashboard-ten.vercel.app/)

---