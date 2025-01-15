import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import GunModel from './gunModel';
const Editor = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <Environment background files={'/env.hdr'} />
      
      {/* Gun Model */}
      <GunModel />
      
      {/* Static Mesh */}.
      <mesh position={[10,0,0]} onClick={()=>alert('ehy')}>
        <boxGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      {/* Perspective Camera with a set position */}
      {/* <PerspectiveCamera makeDefault  /> Set camera position */}
      
      {/* OrbitControls will control this camera */}
      <OrbitControls/>
    </Canvas>
  );
};

export default Editor;
