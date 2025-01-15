import { useRef, useEffect } from 'react';
import { useGunStore } from '../store/gunModel.store';
import { GLTFLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';
import { Group, AnimationMixer } from 'three';

const EnemyModel = () => {
  const modelRef = useRef<Group | null>(null);
  const mixerRef = useRef<AnimationMixer | null>(null); // Reference for the AnimationMixer
  const { setEnemyModel,enemyAnimation } = useGunStore();
  const model = useLoader(GLTFLoader, '/enemy.glb'); // Load the enemy model

  // Store the model reference in the state and set up animation
  useEffect(() => {
    if (modelRef.current) {
      setEnemyModel(modelRef); // Save the model reference in store

      // Set up the animation mixer and start animations
      if (model.animations.length > 0) {
        mixerRef.current = new AnimationMixer(model.scene); // Create a mixer for animations
        model.animations.forEach((clip) => {
          const action = mixerRef.current?.clipAction(clip);
          if(enemyAnimation)action?.play(); // Play each animation clip
        });
      }
    }
  }, [model, setEnemyModel,enemyAnimation]);

  // Update the animation mixer on each frame
  useEffect(() => {
    const mixer = mixerRef.current;
    if (mixer) {
      const animate = () => {
        mixer.update(0.01); // Update animation for the model
        requestAnimationFrame(animate); // Continue the animation loop
      };
      animate();
    }
  }, [enemyAnimation]);

  return (
    <group ref={modelRef}>
      <primitive object={model.scene} />
    </group>
  );
};

export default EnemyModel;
