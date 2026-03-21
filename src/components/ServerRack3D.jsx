import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

export default function ServerRack3D() {
  const groupRef = useRef();
  const { theme } = useTheme();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      // Gentle floating effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const edgeColor = theme === 'cyber' ? '#00f0ff' : '#0047ab';
  const bodyColor = theme === 'cyber' ? '#111111' : '#f5f7fa';

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Main Server Rack Body */}
      <mesh>
        <boxGeometry args={[1.2, 2.5, 1.2]} />
        <meshStandardMaterial color={bodyColor} />
        <Edges scale={1.02} threshold={15} color={edgeColor} />
      </mesh>

      {/* Server Blades / Lights */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[0, -0.8 + i * 0.35, 0.6]}>
          <mesh>
            <boxGeometry args={[0.9, 0.15, 0.1]} />
            <meshStandardMaterial color={theme === 'cyber' ? '#222' : '#ddd'} />
          </mesh>
          {/* Blinking Lights */}
          <mesh position={[-0.3, 0, 0.06]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={theme === 'cyber' ? '#00ff41' : '#10b981'} />
          </mesh>
          <mesh position={[-0.15, 0, 0.06]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ff003c" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
