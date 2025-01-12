import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import GunModel from './gunModel';

const Editor = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <Environment background files={'/env.hdr'} />
      
      {/* Gun Model */}
      <GunModel />
      
      {/* Static Mesh */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      {/* Perspective Camera with a set position */}
      <PerspectiveCamera makeDefault position={[0, 10, 5]} /> {/* Set camera position */}
      
      {/* OrbitControls will control this camera */}
    </Canvas>
  );
};

export default Editor;
