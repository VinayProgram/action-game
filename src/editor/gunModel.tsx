import { ObjectMap, useFrame, useLoader } from '@react-three/fiber';
import  { useRef, useEffect } from 'react';
import { Vector3, Euler, Group, AnimationMixer } from 'three';
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
  const { gunPosition, gunRotation,gestures } = useGunStore();
  const model = useLoader(GLTFLoader, '/gun.glb');
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (model.scene && model.animations.length > 0) {
      mixer.current = new AnimationMixer(model.scene); // Use model.scene for animations
      model.animations.forEach((clip) => {
        const action = mixer.current?.clipAction(clip);
        if(gestures[0]?.[0]?.categoryName=="Closed_Fist"&&clip.name=='Rig|siligun_fire')action?.play(); // Start the animation
      });
    }
  }, [model,gestures]);

  useFrame((st, delta) => {
    // Update the mixer to progress animations
    mixer.current?.update(delta);

    const camera = st.camera;

    // Define the offset for the gun relative to the camera
    const offset = new Vector3(0, -0.5, Math.PI/-20); // Adjust these values for desired gun placement

    // Compute the gun's world position based on the camera's orientation and offset
    const gunWorldPosition = offset.clone().applyQuaternion(camera.quaternion).add(camera.position);

    // Update the gun's position and rotation
    if (modelRef.current) {
      modelRef.current.position.copy(gunWorldPosition);
      modelRef.current.quaternion.copy(camera.quaternion); // Align gun orientation with the camera
    }
  });

  return (
    <group ref={modelRef}>
      <LoadGunModel position={gunPosition} rotation={gunRotation} model={model} />
    </group>
  );
};

export default GunModel;
