import React, { useRef, useEffect } from 'react';

interface CameraComponentProps {
  onFrame: (video: HTMLVideoElement) => void;
}

const VideoCameraComponent: React.FC<CameraComponentProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    };

    setupCamera();

    const interval = setInterval(() => {
      if (videoRef.current) {
        onFrame(videoRef.current);
      }
    }, 100); // Process frames every 100ms.

    return () => clearInterval(interval);
  }, [onFrame]);

  return <video ref={videoRef} style={{ width: '10vw', height: '10vh' ,position:'absolute',top:0}} />;
};

export default VideoCameraComponent;
