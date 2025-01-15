import { useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three-stdlib';
import { useRef, useEffect } from 'react';
import { Group } from 'three';

type EnemyModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

const EnemyModel = ({ position = [0, Math.PI/-5  , 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: EnemyModelProps) => {
  const model = useLoader(GLTFLoader, '/diance.glb') as GLTF;
  const modelRef = useRef<Group | null>(null);

  // Example of accessing and manipulating the model after loading
  useEffect(() => {
    if (model.scene) {
      // Add custom adjustments or access specific nodes here
      console.log('Enemy Model Loaded:', model.scene);

      // Example: Adjust position or rotation of specific nodes
      const specificNode = model.scene.getObjectByName('EnemyNodeName'); // Replace with the actual node name
      if (specificNode) {
        specificNode.rotation.set(0, Math.PI / 4, 0); // Rotate the specific node
      }
    }
  }, [model]);

  return (
    <group ref={modelRef} position={position} rotation={rotation} scale={scale}>
      {/* Use the model.scene as the primitive object */}
      <primitive object={model.scene} />
    </group>
  );
};

export default EnemyModel;
