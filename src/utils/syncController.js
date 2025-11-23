import { useEffect } from "react";

// Synchronize all video players within 0.3s drift
export function useSyncController(videoRefs) {
  useEffect(() => {
    const interval = setInterval(() => {
      const videos = videoRefs.current.map(ref => ref.current?.video).filter(Boolean);
      if (videos.length < 2) return;

      // Only sync if all are playing and ready
      if (!videos.every(v => !v.paused && !v.seeking && v.readyState >= 2)) return;

      // Get current times
      const times = videos.map(v => v.currentTime);
      const min = Math.min(...times);
      const max = Math.max(...times);

      // If drift is too large, sync
      if (max - min > 0.3) {
        videos.forEach((v, i) => {
          if (times[i] < max - 0.1) {
            // Nudge lagging video forward
            v.currentTime = max - 0.05;
          } else if (times[i] > min + 0.3) {
            // Pause leading video briefly
            v.pause();
            setTimeout(() => v.play(), 150);
          }
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [videoRefs]);
}