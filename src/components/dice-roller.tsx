"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';

// Dice library types
interface DiceObject {
  getObject(): THREE.Mesh;
  updateMeshFromBody(): void;
  updateBodyFromMesh(): void;
}

interface DiceManagerInterface {
  setWorld(world: CANNON.World): void;
  prepareValues(values: Array<{ dice: DiceObject; value: number }>): void;
}

// Dynamic imports for threejs-dice (client-side only)
let DiceManager: DiceManagerInterface | null = null;
let DiceD4: new (options: { backColor: string; fontColor: string }) => DiceObject;
let DiceD6: new (options: { backColor: string; fontColor: string }) => DiceObject;
let DiceD8: new (options: { backColor: string; fontColor: string }) => DiceObject;
let DiceD10: new (options: { backColor: string; fontColor: string }) => DiceObject;
let DiceD12: new (options: { backColor: string; fontColor: string }) => DiceObject;
let DiceD20: new (options: { backColor: string; fontColor: string }) => DiceObject;

if (typeof window !== 'undefined') {
  // Dynamic import for client-side only
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const DiceModule = require('threejs-dice');
    DiceManager = DiceModule.DiceManager;
    DiceD4 = DiceModule.DiceD4;
    DiceD6 = DiceModule.DiceD6;
    DiceD8 = DiceModule.DiceD8;
    DiceD10 = DiceModule.DiceD10;
    DiceD12 = DiceModule.DiceD12;
    DiceD20 = DiceModule.DiceD20;
  } catch (error) {
    console.warn('Failed to load threejs-dice:', error);
  }
}

interface DiceRollerProps {
  className?: string;
}

export function DiceRoller({ className = "" }: DiceRollerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const diceRef = useRef<DiceObject[]>([]);
  
  const [lastRoll, setLastRoll] = useState<{ type: string; value: number } | null>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2d5016); // Green table color
    sceneRef.current = scene;

    // Camera setup - top down view
    const camera = new THREE.OrthographicCamera(-300, 300, 300, -300, 1, 1000);
    camera.position.set(0, 400, 0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Physics world setup
    const world = new CANNON.World();
    world.gravity.set(0, -9.82 * 20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    worldRef.current = world;

    // Table surface
    const tableGeometry = new THREE.PlaneGeometry(600, 400);
    const tableMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2d5016,
      transparent: true,
      opacity: 0.8 
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.rotation.x = -Math.PI / 2;
    table.receiveShadow = true;
    scene.add(table);

    // Table physics body
    const tableBody = new CANNON.Body({ mass: 0 });
    tableBody.addShape(new CANNON.Plane());
    tableBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(tableBody);

    // Table edges (invisible walls)
    const wallHeight = 50;
    const wallThickness = 10;
    
    // Create invisible walls around the table
    const walls = [
      { x: 300, y: wallHeight/2, z: 0, w: wallThickness, h: wallHeight, d: 400 }, // Right
      { x: -300, y: wallHeight/2, z: 0, w: wallThickness, h: wallHeight, d: 400 }, // Left  
      { x: 0, y: wallHeight/2, z: 200, w: 600, h: wallHeight, d: wallThickness }, // Back
      { x: 0, y: wallHeight/2, z: -200, w: 600, h: wallHeight, d: wallThickness } // Front
    ];

    walls.forEach(wall => {
      const wallBody = new CANNON.Body({ mass: 0 });
      wallBody.addShape(new CANNON.Box(new CANNON.Vec3(wall.w/2, wall.h/2, wall.d/2)));
      wallBody.position.set(wall.x, wall.y, wall.z);
      world.addBody(wallBody);
    });

    // Initialize DiceManager
    if (DiceManager) {
      DiceManager.setWorld(world);
    }

    // Animation loop
    const animate = () => {
      if (worldRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        worldRef.current.step(1.0 / 60.0);
        
        // Update dice meshes from physics bodies
        diceRef.current.forEach(dice => {
          if (dice && dice.updateMeshFromBody) {
            dice.updateMeshFromBody();
          }
        });
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mount) {
        mount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const rollDice = (diceType: string) => {
    if (!sceneRef.current || !worldRef.current || typeof window === 'undefined' || !DiceManager) return;

    // Clear existing dice
    diceRef.current.forEach(dice => {
      if (dice && dice.getObject) {
        sceneRef.current?.remove(dice.getObject());
      }
    });
    diceRef.current = [];

    // Create new dice based on type
    let dice: DiceObject | null = null;
    let maxValue: number;
    
    const diceOptions = {
      backColor: '#ffffff',
      fontColor: '#000000'
    };

    switch (diceType) {
      case 'd4':
        if (DiceD4) dice = new DiceD4(diceOptions);
        maxValue = 4;
        break;
      case 'd6':
        if (DiceD6) dice = new DiceD6(diceOptions);
        maxValue = 6;
        break;
      case 'd8':
        if (DiceD8) dice = new DiceD8(diceOptions);
        maxValue = 8;
        break;
      case 'd10':
        if (DiceD10) dice = new DiceD10(diceOptions);
        maxValue = 10;
        break;
      case 'd12':
        if (DiceD12) dice = new DiceD12(diceOptions);
        maxValue = 12;
        break;
      case 'd20':
        if (DiceD20) dice = new DiceD20(diceOptions);
        maxValue = 20;
        break;
      default:
        return;
    }

    if (!dice) return;

    // Add dice to scene
    sceneRef.current.add(dice.getObject());
    dice.getObject().castShadow = true;
    dice.getObject().receiveShadow = true;

    // Position dice randomly in the center area
    const startX = (Math.random() - 0.5) * 100;
    const startZ = (Math.random() - 0.5) * 100;
    dice.getObject().position.set(startX, 100, startZ);
    
    // Add some random rotation
    dice.getObject().rotation.x = Math.random() * Math.PI * 2;
    dice.getObject().rotation.y = Math.random() * Math.PI * 2;
    dice.getObject().rotation.z = Math.random() * Math.PI * 2;
    
    dice.updateBodyFromMesh();

    // Generate random value and prepare it
    const randomValue = Math.floor(Math.random() * maxValue) + 1;
    DiceManager.prepareValues([{ dice: dice, value: randomValue }]);
    
    diceRef.current = [dice];
    setLastRoll({ type: diceType, value: randomValue });

    // Add some initial force for a more dynamic roll
    const diceObject = dice.getObject() as THREE.Mesh & { body?: CANNON.Body };
    if (diceObject.body) {
      const force = new CANNON.Vec3(
        (Math.random() - 0.5) * 1000,
        0,
        (Math.random() - 0.5) * 1000
      );
      diceObject.body.applyImpulse(force, diceObject.body.position);
    }
  };

  const diceTypes = [
    { name: 'd4', label: 'D4', color: 'bg-red-600 hover:bg-red-700' },
    { name: 'd6', label: 'D6', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'd8', label: 'D8', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'd10', label: 'D10', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { name: 'd12', label: 'D12', color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'd20', label: 'D20', color: 'bg-pink-600 hover:bg-pink-700' }
  ];

  return (
    <div className={`${className}`}>
      <div className="space-y-4">
        {/* Dice Selection */}
        <div className="grid grid-cols-6 gap-2">
          {diceTypes.map(dice => (
            <button
              key={dice.name}
              onClick={() => rollDice(dice.name)}
              className={`${dice.color} text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors`}
            >
              {dice.label}
            </button>
          ))}
        </div>

        {/* Last Roll Result */}
        {lastRoll && (
          <div className="bg-slate-600 rounded-lg p-3 text-center">
            <div className="text-slate-300 text-sm">Last Roll:</div>
            <div className="text-white font-bold text-lg">
              {lastRoll.type.toUpperCase()}: {lastRoll.value}
            </div>
          </div>
        )}

        {/* 3D Canvas */}
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-slate-300 text-sm mb-2 text-center">Roll the dice on the table!</div>
          <div 
            ref={mountRef} 
            className="mx-auto border-2 border-slate-600 rounded"
            style={{ width: '600px', height: '400px' }}
          />
        </div>

        <div className="text-slate-400 text-xs text-center">
          Click any die type above to roll it on the table
        </div>
      </div>
    </div>
  );
} 