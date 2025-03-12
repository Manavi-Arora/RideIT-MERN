import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ glbPath }) => {
  const { scene } = useGLTF(glbPath);
  return <primitive object={scene} scale={1.5} />;
};

const Scene = (props) => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 20 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Model glbPath={`${props.vehicle}.glb`} />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;