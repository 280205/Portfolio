"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reference clean /audio.mp3 file in public directory
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio playback error:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 pointer-events-auto ${
        isPlaying
          ? "border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_rgba(129,140,248,0.25)]"
          : "border-white/10 bg-white/5 text-muted hover:text-white hover:bg-white/10"
      }`}
      title={isPlaying ? "Mute Background Audio" : "Play Ambient Background Audio"}
    >
      {/* Animated Equalizer Bars when Playing */}
      <div className="flex items-end gap-[2px] h-3 w-3.5">
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "h-full animate-[bounce_1.2s_infinite_100ms]" : "h-1"
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "h-[70%] animate-[bounce_1s_infinite_300ms]" : "h-2"
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "h-full animate-[bounce_1.4s_infinite_200ms]" : "h-1"
          }`}
        />
      </div>

      <span className="font-mono text-[10px] uppercase tracking-wider">
        {isPlaying ? "Sound On" : "Sound Off"}
      </span>
    </button>
  );
}
