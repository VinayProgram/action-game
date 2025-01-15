import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import GunModel from './gunModel';
import EnemyModel from './enemyModel';
const Editor = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <Environment background files={'/env.hdr'} />
      
      <ambientLight args={[10,10]}></ambientLight>
      {/* Gun Model */}
      <GunModel />
      <EnemyModel/>
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
