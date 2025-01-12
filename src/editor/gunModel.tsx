import { ObjectMap } from '@react-three/fiber';
import React, { useRef } from 'react'
import { Vector3, Euler, Object3D, Group } from 'three';
import { GLTF } from 'three-stdlib';


const LoadGunModel = ({ position, rotation, model }:{position:Vector3, rotation:Euler, model:GLTF & ObjectMap}) => {
    return (
      <group rotation={rotation} position={position} scale={new Vector3(0.01, 0.01, 0.01)}>
        <primitive object={model.scene} />
      </group>
    );
  };
  
  
const GunModel = () => {
const modelRef=useRef<Group|null>(null)
  return (
    <group ref={modelRef}>
    <LoadGunModel position={position} rotation={rotation} model={model} />
  </group>
  )
}


export default GunModel