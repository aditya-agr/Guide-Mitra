import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GuideAvatar = () => {
  // Load the 3D model
  const gltf = useLoader(GLTFLoader, '/models/mohamed.glb');

  return (
    <Canvas className="h-screen">
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Render 3D model */}
      <primitive 
        object={gltf.scene} 
        scale={1.5} 
        position={[0, -1, 0]} // Adjust position as needed
      />

      {/* Controls for rotation */}
    </Canvas>
  );
};

export default GuideAvatar;
