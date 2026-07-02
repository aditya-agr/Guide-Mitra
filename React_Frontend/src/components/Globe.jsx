import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// Fresnel-style rim glow rendered on the inside of a slightly larger sphere
const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(0.35, 0.6, 1.0, 1.0) * intensity;
  }
`;

const RotatingGlobe = () => {
  const globeRef = useRef();
  const parallaxRef = useRef();
  const earthTexture = useLoader(THREE.TextureLoader, '/earth_texture.jpg');

  useFrame(({ pointer }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
    // Ease the whole scene toward the cursor for a parallax feel
    if (parallaxRef.current) {
      parallaxRef.current.rotation.x = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.x,
        pointer.y * 0.12,
        0.05
      );
      parallaxRef.current.rotation.y = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.y,
        pointer.x * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={parallaxRef}>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.35}>
        <mesh ref={globeRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial map={earthTexture} roughness={0.75} metalness={0.1} />
        </mesh>
        <mesh scale={1.18}>
          <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent
            depthWrite={false}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Globe = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ height: '100%', width: '100%', background: 'black' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.6} />
      <pointLight position={[-10, -8, -10]} intensity={0.4} color="#4466ff" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={80} scale={9} size={2} speed={0.35} opacity={0.5} color="#8fc7ff" />

      <Suspense fallback={null}>
        <RotatingGlobe />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
};

export default Globe;
