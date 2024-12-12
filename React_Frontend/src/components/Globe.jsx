import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const RotatingGlobe = () => {
  // Reference for the globe mesh
  const globeRef = useRef();

  // Load the Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, '/earth_texture.jpg');

  // Rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002; // Adjust speed if necessary
    }
  });

  return (
    <mesh ref={globeRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const Globe = () => {
  return (
    <Canvas style={{ height: '100vh', background: 'black' }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Render the RotatingGlobe component inside the Canvas */}
      <RotatingGlobe />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Globe;
