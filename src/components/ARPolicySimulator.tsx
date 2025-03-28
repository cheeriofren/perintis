import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Policy } from '@/types/policy';

interface ARPolicySimulatorProps {
  policy: Policy;
  width?: number;
  height?: number;
}

export default function ARPolicySimulator({ 
  policy, 
  width = 400, 
  height = 300 
}: ARPolicySimulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Create policy visualization
    createPolicyVisualization(scene, policy);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [policy, width, height]);

  const createPolicyVisualization = (scene: THREE.Scene, policy: Policy) => {
    // Create policy timeline
    const timelineGeometry = new THREE.BoxGeometry(3, 0.2, 0.2);
    const timelineMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });
    const timeline = new THREE.Mesh(timelineGeometry, timelineMaterial);
    scene.add(timeline);

    // Add impact indicators
    policy.impacts.forEach((impact, index) => {
      const indicatorGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const indicatorMaterial = new THREE.MeshPhongMaterial({ 
        color: getImpactColor(impact.metrics[0].trend)
      });
      const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
      indicator.position.x = (index - policy.impacts.length / 2) * 0.5;
      indicator.position.y = 0.2;
      scene.add(indicator);
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div ref={containerRef} className="w-full h-auto" />
      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Lihat dalam AR
        </button>
      </div>
    </div>
  );
}

function getImpactColor(trend: 'up' | 'down' | 'stable'): number {
  switch (trend) {
    case 'up':
      return 0x22c55e; // green-500
    case 'down':
      return 0xef4444; // red-500
    case 'stable':
      return 0x3b82f6; // blue-500
    default:
      return 0x64748b; // gray-500
  }
} 