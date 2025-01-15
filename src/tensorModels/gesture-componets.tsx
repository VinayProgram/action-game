"use client";
import { GestureRecognizer, NormalizedLandmark } from '@mediapipe/tasks-vision';
import React, { useState, useCallback } from 'react';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';import GestureRecognizerComponent from './gesture-recognoze';
import VideoCameraComponent from './videoCamera';
import { useGunStore } from '../store/gunModel.store';
;

const HandTrack: React.FC = () => {
  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | null>(null);
  const {setLandmarks,setGestures}=useGunStore()
  const handleFrame = useCallback(
    async (video: HTMLVideoElement) => {
      if (gestureRecognizer) {
        try {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const result = await gestureRecognizer.recognizeForVideo(video, performance.now());
            // console.log(result.gestures)
            setGestures(result?.gestures)
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

  return (
    <div>
      <GestureRecognizerComponent setGestureRecognizer={setGestureRecognizer} />
      <VideoCameraComponent onFrame={handleFrame} />
    </div>
  );
};

export default HandTrack;
