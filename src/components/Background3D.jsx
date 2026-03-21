import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

function InteractiveParticles({ theme }) {
  const count = 1000;
  const mesh = useRef();
  
  // Create random initial positions
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      const val = (Math.random() - 0.5) * 20; // Spread across a 20x20x20 area
      pos[i] = val;
      orig[i] = val;
    }
    return [pos, orig];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Convert 2D mouse ([-1, 1]) to an approximate 3D world space coordinate
    // Assuming camera is at z=5
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x = originalPositions[i3];
      let y = originalPositions[i3 + 1];
      let z = originalPositions[i3 + 2];

      // Add a slow floating sine wave drift to all particles
      x += Math.sin(time + z) * 0.1;
      y += Math.cos(time + x) * 0.1;

      // Mouse repulsion calculation
      const dx = mouseX - x;
      const dy = mouseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 3; // Repel radius

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        x -= (dx / distance) * force * 1.5;
        y -= (dy / distance) * force * 1.5;
      }

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  const particleColor = theme === 'cyber' ? '#00f0ff' : '#0047ab';

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={particleColor} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function Background3D() {
  const { theme } = useTheme();
  // Don't render particles on mobile to save performance
  const [isMobile] = useState(() => window.innerWidth < 768);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {!isMobile && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="opacity-40">
          <InteractiveParticles theme={theme} />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 mix-blend-screen pointer-events-none"></div>
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
    </div>
  );
}
