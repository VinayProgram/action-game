import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import GunModel from './editor/gunModel';

const App = () => {
 

return  (
  <Canvas style={{ height: '100vh' }}>
    <Environment background files={'/env.hdr'}/>
    <GunModel />
    <PerspectiveCamera fov={75} makeDefault position={[20, -10, 0]} /> {/* Moves the camera back */}
    <OrbitControls/>
    </Canvas>
);}

export default App;
