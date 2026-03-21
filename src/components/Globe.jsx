import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Helper to convert lat/long to 3D Cartesian coordinates
function getPosFromLatLng(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

function AnimatedArc({ startPos, endPos, theme }) {
  const lineRef = useRef();
  
  // Create a 3D Quadratic Bezier Curve bridging the two points
  const { geometry, curve } = useMemo(() => {
    const midPoint = startPos.clone().lerp(endPos, 0.5);
    // Push the midpoint out from the center of the sphere
    const distance = startPos.distanceTo(endPos);
    midPoint.normalize().multiplyScalar(2 + distance * 0.4); 

    const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return { geometry, curve };
  }, [startPos, endPos]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      // Loop the stroke/dash rendering to look like a shooting laser
      const time = clock.elapsedTime * 2.5; // Increased speed
      lineRef.current.material.dashOffset = -time;
    }
  });

  const lineColor = theme === 'cyber' ? '#ff003c' : '#ef4444';

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial 
        color={lineColor} 
        dashSize={0.6} 
        gapSize={4} 
        transparent 
        opacity={1}
        linewidth={3} 
      />
    </line>
  );
}

export default function Globe() {
  const meshRef = useRef();
  const { theme } = useTheme();
  
  // Create a sphere geometry and convert it to wireframe lines
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 4), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Generate some random attack vectors
  const attacks = useMemo(() => {
    const vectors = [];
    for (let i = 0; i < 25; i++) { // Increased to 25 simultaneous vectors
        const startLat = (Math.random() - 0.5) * 160;
        const startLng = (Math.random() - 0.5) * 360;
        const endLat = (Math.random() - 0.5) * 160;
        const endLng = (Math.random() - 0.5) * 360;
        
        vectors.push({
            start: getPosFromLatLng(startLat, startLng, 2),
            end: getPosFromLatLng(endLat, endLng, 2),
            id: i
        });
    }
    return vectors;
  }, []);

  // Threat feed state for the HTML HUD
  const [threatFeed, setThreatFeed] = useState([
    "INITIALIZING SUBROUTINES...",
    "ESTABLISHING SECURE HANDSHAKE..."
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const ips = Array.from({length: 4}, () => Math.floor(Math.random() * 255)).join('.');
      const port = Math.floor(Math.random() * 9000) + 1000;
      const type = Math.random() > 0.5 ? "DDoS UDP FLOOD" : "SQLi ATTEMPT BLOCKED";
      const newLog = `[DETECTED] ${ips}:${port} - ${type}`;
      
      setThreatFeed(prev => {
        const next = [...prev, newLog];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
      
      // Basic parallax effect based on mouse
      const targetRotationX = (state.pointer.y * Math.PI) / 10;
      const targetRotationY = (state.pointer.x * Math.PI) / 10;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    }
  });

  const globeColor = theme === 'cyber' ? '#00f0ff' : '#0047ab';

  return (
    <group ref={meshRef}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={globeColor} transparent opacity={0.3} />
      </lineSegments>
      {attacks.map(attack => (
        <AnimatedArc key={attack.id} startPos={attack.start} endPos={attack.end} theme={theme} />
      ))}
      
      {/* Target Nodes / Hit Markers */}
      {attacks.map(attack => (
        <mesh key={`hit-${attack.id}`} position={attack.end}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={theme === 'cyber' ? '#ff003c' : '#ef4444'} />
        </mesh>
      ))}

      {/* Live HUD Overlay */}
      <Html position={[2.5, 1.5, 0]} center zIndexRange={[100, 0]}>
        <div className="hidden lg:flex flex-col gap-1 w-64 bg-black/60 border border-cyber-red/50 p-3 backdrop-blur-sm pointer-events-none rounded font-mono text-[10px] text-cyber-red/80 select-none shadow-[0_0_15px_rgba(255,0,60,0.2)]">
          <h3 className="text-cyber-red border-b border-cyber-red/30 pb-1 mb-1 font-orbitron tracking-widest text-xs">SOC THREAT FEED</h3>
          {threatFeed.map((log, i) => (
            <div key={i} className="animate-pulse">{log}</div>
          ))}
        </div>
      </Html>
    </group>
  );
}
