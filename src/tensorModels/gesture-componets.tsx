"use client";
import { GestureRecognizer, NormalizedLandmark } from '@mediapipe/tasks-vision';
import React, { useState, useCallback, useEffect } from 'react';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';import GestureRecognizerComponent from './gesture-recognoze';
import VideoCameraComponent from './videoCamera';
import { useGunStore } from '../store/gunModel.store';
;

const HandTrack: React.FC = () => {
  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | null>(null);
  const {setLandmarks}=useGunStore()
  const handleFrame = useCallback(
    async (video: HTMLVideoElement) => {
      if (gestureRecognizer) {
        try {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const result = await gestureRecognizer.recognizeForVideo(video, performance.now());
            console.log(result)
            trackHand(result.landmarks);
          } else {
            console.warn("Invalid video frame dimensions.");
          }
        } catch (error) {
          console.error("Gesture recognition error:", error);
        }
      }
    },
    [gestureRecognizer]
  );

  // Track all fingers
  function trackHand(landmarks: NormalizedLandmark[][]) {
    if (!landmarks || !landmarks[0]) return;
    setLandmarks(landmarks)
    // console.log(landmarks);
  }

  useEffect(() => {
    const cursorElement = document.createElement("div");
    cursorElement.id = "custom-cursor";
    cursorElement.style.position = "absolute";
    cursorElement.style.width = "10px";
    cursorElement.style.height = "10px";
    cursorElement.style.borderRadius = "50%";
    cursorElement.style.zIndex = '245';
    cursorElement.style.backgroundColor = "red";
    cursorElement.style.pointerEvents = "none";
    document.body.appendChild(cursorElement);

    return () => {
      const cursor = document.getElementById("custom-cursor");
      if (cursor) document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div>
      <GestureRecognizerComponent setGestureRecognizer={setGestureRecognizer} />
      <VideoCameraComponent onFrame={handleFrame} />
    </div>
  );
};

export default HandTrack;
