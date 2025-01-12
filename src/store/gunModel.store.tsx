import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { Euler, Vector3 } from 'three';
import { create } from 'zustand';

type Store = {
  gunPosition: Vector3;
  gunRotation: Euler;
  scale: unknown;
  landmarks:NormalizedLandmark[][]
  setLandmarks:(landmarks:NormalizedLandmark[][])=>void
  setGunPosition: (position: Vector3) => void;
  setGunRotation: (rotation: Euler) => void;
  setScale: (scale: unknown) => void;
};

export const useGunStore = create<Store>()((set) => ({
  gunPosition : new Vector3(0, 0, 0), // Move the model backward
  gunRotation: new Euler(0, Math.PI/1, 0),
  scale: '',
  landmarks:[],
  setLandmarks:(landmarksDerived)=>set(()=>({landmarks:landmarksDerived})),
  setGunPosition: (position: Vector3) => {
    set(() => ({ gunPosition: position }));
  },
  setGunRotation: (rotation: Euler) => {
    set(() => ({ gunRotation: rotation }));
  },
  setScale: (scale: unknown) => {
    set(() => ({ scale }));
  },
}));
