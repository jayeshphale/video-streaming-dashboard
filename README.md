# Video Streaming Dashboard (React + JavaScript)

A synchronized multi-stream HLS dashboard using a single RTSP feed.

---

## 1. RTSP → HLS Conversion

**RTSP Source:**  
`rtsp://13.60.76.79:8554/live`

Use [FFmpeg](https://ffmpeg.org/) or [MediaMTX](https://github.com/bluenviron/mediamtx) to convert RTSP to HLS.  
Simulate 6 HLS endpoints from the same RTSP source.

---

## 2. FFmpeg Commands for 6 HLS Streams

Run 6 FFmpeg processes (or duplicate outputs) to generate:

```
/hls/stream1/index.m3u8
/hls/stream2/index.m3u8
...
/hls/stream6/index.m3u8
```

**Example FFmpeg command:**
```sh
ffmpeg -rtsp_transport tcp -i rtsp://13.60.76.79:8554/live \
  -c:v copy -c:a aac -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments \
  ./hls/stream1/index.m3u8
```
Repeat for `stream2`, ..., `stream6`.

---

## 3. Synchronization Logic

- Each video is played with [hls.js](https://github.com/video-dev/hls.js).
- The `syncController` hook checks all players every 0.5s.
- If any player is >0.3s behind, it is nudged forward.
- If any player is >0.3s ahead, it is paused briefly.
- Keeps all 6 players within ~0.3s drift.

---

## 4. Run Locally

```sh
npm install
npm start
```
- Make sure your HLS endpoints are accessible at `/hls/streamX/index.m3u8`.

---

## 5. Deploy (Vercel / Netlify)

- Push to GitHub.
- Import repo in [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- Set up a proxy or static server for `/hls/` if needed.

---

## 6. File Structure

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

## 7. Credits

- React, hls.js, FFmpeg, MediaMTX