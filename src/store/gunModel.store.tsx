import { Category, NormalizedLandmark } from '@mediapipe/tasks-vision';
import { Euler, Group, Object3DEventMap, Vector3 } from 'three';
import { create } from 'zustand';

type Store = {
  gunPosition: Vector3;
  gunRotation: Euler;
  gestures:Category[][],
  setGestures:(next:Category[][])=>void
  scale: unknown;
  enemyModel: React.MutableRefObject<Group<Object3DEventMap> | null>|null
  setEnemyModel:(next:React.MutableRefObject<Group<Object3DEventMap> | null>)=>void
  enemyAnimation:boolean,
  setEnemyAnimation:(next:boolean)=>void
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
  enemyAnimation:false,
  setEnemyAnimation:(next)=>set(()=>({enemyAnimation:next})),
  enemyModel:null,
  setEnemyModel:(next)=>set(()=>({enemyModel:next})),
  landmarks:[],
  setLandmarks:(landmarksDerived)=>set(()=>({landmarks:landmarksDerived})),
  gestures:[],
  setGestures:(next)=>set(()=>({gestures:next})),
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
