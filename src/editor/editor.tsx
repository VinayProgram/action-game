import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import GunModel from './gunModel';
import { useGunStore } from '../store/gunModel.store';

const Editor = () => {
  const{landmarks}=useGunStore()
  return (
    <Canvas style={{ height: '100vh' }}>
      <Environment background files={'/env.hdr'} />
      
      {/* Gun Model */}
      <GunModel />
      
      {/* Static Mesh */}.
      <mesh position={[landmarks[0][0].x,landmarks[0][0].y,landmarks[0][0].z]} onClick={()=>alert('ehy')}>
        <boxGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      {/* Perspective Camera with a set position */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} /> {/* Set camera position */}
      
      {/* OrbitControls will control this camera */}
    </Canvas>
  );
};

export default Editor;
