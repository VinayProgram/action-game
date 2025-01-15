import { ObjectMap, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Vector3, Euler, Group, AnimationMixer, Raycaster, Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three-stdlib';
import { useGunStore } from '../store/gunModel.store';

const LoadGunModel = ({ position, rotation, model }: { position: Vector3; rotation: Euler; model: GLTF & ObjectMap }) => {
  return (
    <group rotation={rotation} position={position}>
      <primitive object={model.scene} />
    </group>
  );
};

const GunModel = () => {
  const modelRef = useRef<Group | null>(null);
  const raycaster = useRef(new Raycaster());
  const { gunPosition, gunRotation, gestures } = useGunStore();
  const model = useLoader(GLTFLoader, '/gun.glb');
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (model.scene && model.animations.length > 0) {
      mixer.current = new AnimationMixer(model.scene);
      model.animations.forEach((clip) => {
        const action = mixer.current?.clipAction(clip);
        if (gestures[0]?.[0]?.categoryName === "Closed_Fist" && clip.name === 'Rig|siligun_fire') {
          action?.play(); // Start the animation
        }
      });
    }
  }, [model, gestures]);

  useFrame((st, delta) => {
    // Update the mixer to progress animations
    mixer.current?.update(delta);

    const camera = st.camera;

    // Define the offset for the gun relative to the camera
    const offset = new Vector3(0, -0.5, Math.PI/-15); // Adjust these values for desired gun placement

    // Compute the gun's world position and direction based on its orientation
    if (modelRef.current) {
      // Gun's world position
      const gunWorldPosition = offset.clone().applyQuaternion(camera.quaternion).add(camera.position);

      modelRef.current.position.copy(gunWorldPosition);
      modelRef.current.quaternion.copy(camera.quaternion); // Align gun orientation with the camera

      // Raycasting logic when gesture is "Closed_Fist"
      if (gestures[0]?.[0]?.categoryName === "Closed_Fist") {
        const gunDirection = new Vector3(0, 0, -1).applyQuaternion(modelRef.current.quaternion); // Gun's forward direction
        raycaster.current.set(modelRef.current.position, gunDirection);
      
        // Detect intersections
        const intersects = raycaster.current.intersectObjects(st.scene.children, true);
        intersects.forEach((intersect) => {
          const object = intersect.object;
          if (object instanceof Mesh && object.material) {// Save original color
            object.material.color.set('black'); // Change color to red
          }
        });

      }
    }
  });

  return (
    <group ref={modelRef}>
      <LoadGunModel position={gunPosition} rotation={gunRotation} model={model} />
    </group>
  );
};

export default GunModel;
