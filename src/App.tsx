import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef } from 'react';
import { GLTFLoader } from 'three-stdlib';
import { Object3D } from 'three';

const FollowModel = () => {
  const gltf = useLoader(GLTFLoader, '/gun.glb'); // Load the model
  const modelRef = useRef<Object3D|null>(null);

  // Update the model's position to follow the camera
  

  return (
    <>
      <primitive ref={modelRef} object={gltf.scene} />
    </>
  );
};

const App = () => (
  <Canvas style={{ height: '100vh' }}>
    <Environment background files={'/env.hdr'}/>
    <FollowModel />
  </Canvas>
);

export default App;
