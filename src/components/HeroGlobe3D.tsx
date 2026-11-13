import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Compass, Globe, Info, RotateCw, MapPin } from 'lucide-react';

interface DiplomaticCity {
  id: string;
  name: string;
  role: string;
  committeeMatch: string;
  lat: number;
  lng: number;
  description: string;
}

const DIPLOMATIC_CITIES: DiplomaticCity[] = [
  {
    id: 'delhi',
    name: 'New Delhi',
    role: 'Parliament of India',
    committeeMatch: 'Lok Sabha Committee',
    lat: 28.6139,
    lng: 77.2090,
    description: 'Seat of the Indian Republic. Home to fiery parliamentary debates, constitutional bills, and electoral reform discussions.',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    role: 'Cricket Board & BCCI HQ',
    committeeMatch: 'IPL Auction Crisis',
    lat: 19.0760,
    lng: 72.8777,
    description: 'Financial capital and headquarters of Indian cricket governance, mega-auction war rooms, and franchise sports diplomacy.',
  },
  {
    id: 'new-york',
    name: 'New York (UNHQ)',
    role: 'United Nations Headquarters',
    committeeMatch: 'UNSC & Marvel Crisis',
    lat: 40.7489,
    lng: -73.9680,
    description: 'Global diplomatic epicentre on the East River, confronting autonomous cyber conflict and superhero sovereignty accords.',
  },
  {
    id: 'geneva',
    name: 'Geneva',
    role: 'Palais des Nations',
    committeeMatch: 'International Disarmament',
    lat: 46.2044,
    lng: 6.1432,
    description: 'European diplomatic capital fostering historic peace treaties, human rights conventions, and humanitarian treaties.',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    role: 'Asia-Pacific Diplomatic Forum',
    committeeMatch: 'Technology & Defense',
    lat: 35.6762,
    lng: 139.6503,
    description: 'Hub of high-technology non-proliferation dialogues and Pacific multilateral partnerships.',
  },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate photorealistic procedural diplomatic globe texture with night lights & illuminated continents
function generateEnhancedGlobeTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep oceanic gradient (Midnight navy #0a1122 to #101C35)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#090f1d');
  oceanGrad.addColorStop(0.3, '#101C35');
  oceanGrad.addColorStop(0.7, '#13203c');
  oceanGrad.addColorStop(1, '#090f1d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle graticule lines (latitude & longitude) with gold dust
  ctx.strokeStyle = 'rgba(214, 184, 117, 0.12)';
  ctx.lineWidth = 1;

  // Parallels (latitude)
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Meridians (longitude)
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  const toX = (lng: number) => ((lng + 180) / 360) * width;
  const toY = (lat: number) => ((90 - lat) / 180) * height;

  const drawLandmass = (
    coords: [number, number][],
    fill = '#182b4c',
    stroke = 'rgba(214, 184, 117, 0.75)'
  ) => {
    if (coords.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(toX(coords[0][0]), toY(coords[0][1]));
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(toX(coords[i][0]), toY(coords[i][1]));
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Indian Subcontinent (Highlighted for Lok Sabha & IPL with golden vibrancy)
  drawLandmass([
    [68, 25], [74, 33], [78, 35], [88, 28], [92, 24],
    [88, 21], [85, 17], [80, 12], [77, 8], [76, 12],
    [72, 19], [68, 23]
  ], '#2a2245', 'rgba(214, 184, 117, 0.95)');

  // North America
  drawLandmass([
    [-165, 68], [-140, 70], [-100, 75], [-60, 65], [-55, 48],
    [-75, 42], [-80, 25], [-95, 20], [-105, 25], [-120, 35],
    [-125, 48], [-140, 58], [-165, 62]
  ], '#1a2948', 'rgba(214, 184, 117, 0.7)');

  // Central America
  drawLandmass([
    [-98, 20], [-85, 15], [-78, 8], [-83, 10], [-95, 17]
  ], '#221c38', 'rgba(214, 184, 117, 0.6)');

  // South America
  drawLandmass([
    [-75, 10], [-50, -2], [-35, -5], [-40, -22], [-55, -38],
    [-68, -55], [-74, -45], [-72, -20], [-80, -2], [-78, 8]
  ], '#182442', 'rgba(214, 184, 117, 0.7)');

  // Europe (Burgundy diplomatic touch)
  drawLandmass([
    [-10, 36], [0, 42], [5, 48], [-5, 55], [10, 60],
    [25, 70], [40, 65], [45, 50], [30, 42], [20, 38],
    [10, 36], [-5, 36]
  ], '#321c32', 'rgba(214, 184, 117, 0.85)');

  // British Isles
  drawLandmass([
    [-10, 52], [-5, 58], [2, 53], [-3, 50]
  ], '#281a38', 'rgba(214, 184, 117, 0.7)');

  // Africa
  drawLandmass([
    [-15, 30], [10, 37], [32, 31], [42, 15], [51, 12],
    [40, -10], [32, -30], [20, -35], [12, -20], [10, 5],
    [-5, 5], [-18, 15]
  ], '#192648', 'rgba(214, 184, 117, 0.7)');

  // Asia / Eurasia
  drawLandmass([
    [40, 65], [70, 75], [120, 75], [170, 65], [140, 50],
    [130, 40], [120, 30], [105, 20], [92, 24], [78, 35],
    [70, 35], [60, 30], [50, 35], [45, 50]
  ], '#1c2d52', 'rgba(214, 184, 117, 0.75)');

  // East Asia & Southeast Asia
  drawLandmass([
    [100, 20], [115, 22], [108, 12], [100, 4], [105, -5],
    [115, -8], [125, 5], [120, 15]
  ], '#1c2a4a', 'rgba(214, 184, 117, 0.7)');

  // Japan
  drawLandmass([
    [130, 32], [136, 35], [142, 44], [140, 36], [132, 32]
  ], '#301c36', 'rgba(214, 184, 117, 0.75)');

  // Australia
  drawLandmass([
    [115, -22], [130, -12], [145, -15], [152, -28], [140, -38],
    [118, -35], [114, -25]
  ], '#182746', 'rgba(214, 184, 117, 0.7)');

  // Glowing city night lights across world hubs
  const cityClusters = [
    { lng: 77.2, lat: 28.6, intensity: 1.0, color: '#FFE082' }, // New Delhi
    { lng: 72.8, lat: 19.0, intensity: 1.0, color: '#FFE082' }, // Mumbai
    { lng: 88.3, lat: 22.5, intensity: 0.8, color: '#FFD54F' }, // Kolkata
    { lng: 77.5, lat: 12.9, intensity: 0.8, color: '#FFD54F' }, // Bengaluru
    { lng: -73.9, lat: 40.7, intensity: 1.0, color: '#FFF8E1' }, // New York
    { lng: -0.1, lat: 51.5, intensity: 0.9, color: '#FFF8E1' },  // London
    { lng: 2.3, lat: 48.8, intensity: 0.9, color: '#FFE082' },   // Paris
    { lng: 6.1, lat: 46.2, intensity: 1.0, color: '#D6B875' },  // Geneva
    { lng: 139.6, lat: 35.6, intensity: 1.0, color: '#FFF8E1' }, // Tokyo
    { lng: 103.8, lat: 1.3, intensity: 0.9, color: '#FFE082' },  // Singapore
    { lng: 55.2, lat: 25.2, intensity: 0.9, color: '#FFE082' },  // Dubai
  ];

  for (const c of cityClusters) {
    const cx = toX(c.lng);
    const cy = toY(c.lat);

    const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, 18 * c.intensity);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.2, c.color);
    grad.addColorStop(0.6, 'rgba(214, 184, 117, 0.35)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 18 * c.intensity, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function HeroGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<DiplomaticCity | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isUserDragging, setIsUserDragging] = useState(false);

  // References for continuous animation and camera damping
  const targetCamPos = useRef(new THREE.Vector3(0, 0.2, 7.0));
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  // Drag interaction state
  const dragRef = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    velX: 0,
    velY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL Guard following Three.js guidelines
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090D, 0.045);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 7.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Studio Environment reflection using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig (Warm Gold Key, Cool Navy Fill, Burgundy Rim)
    const keyLight = new THREE.DirectionalLight(0xffecd1, 3.2);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x101c35, 0x641e35, 1.4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd6b875, 2.5);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Core Globe Assembly (Group of 3-12 parts)
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const globeRadius = 2.45;

    // Part 1: Primary Textured Globe Sphere with High-Detail PBR
    const globeTexture = generateEnhancedGlobeTexture();
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: globeTexture,
      roughness: 0.32,
      metalness: 0.35,
      bumpScale: 0.08,
      emissive: 0x101c35,
      emissiveIntensity: 0.2,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeMeshRef.current = globeMesh;
    globeGroup.add(globeMesh);

    // Part 2: Outer Radiant Atmospheric Halo
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.035, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xd6b875,
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    globeGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

    // Part 3: Inner Burgundy Twilight Aura
    const innerAuraGeo = new THREE.SphereGeometry(globeRadius * 1.015, 32, 32);
    const innerAuraMat = new THREE.MeshBasicMaterial({
      color: 0x641e35,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    globeGroup.add(new THREE.Mesh(innerAuraGeo, innerAuraMat));

    // Part 4, 5, 6: Multi-Axis Golden Gyroscope Orbital Rings
    const ringGroup = new THREE.Group();
    globeGroup.add(ringGroup);

    // Primary golden orbit ring
    const ring1Geo = new THREE.TorusGeometry(globeRadius * 1.45, 0.018, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd6b875,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0xd6b875,
      emissiveIntensity: 0.2,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI * 0.38;
    ring1Mesh.rotation.y = Math.PI * 0.12;
    ringGroup.add(ring1Mesh);

    // Secondary counter-tilted ring
    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.68, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf2deaa,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0xd6b875,
      emissiveIntensity: 0.15,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI * 0.45;
    ring2Mesh.rotation.z = Math.PI * 0.28;
    ringGroup.add(ring2Mesh);

    // Broad outer hairline golden halo
    const ring3Geo = new THREE.TorusGeometry(globeRadius * 1.9, 0.008, 12, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xd6b875,
      transparent: true,
      opacity: 0.4,
    });
    const ring3Mesh = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Mesh.rotation.x = Math.PI * 0.5;
    ringGroup.add(ring3Mesh);

    // Part 7: Satellite Nodes on Orbital Rings
    const nodeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xd6b875,
      emissiveIntensity: 0.9,
      metalness: 0.95,
      roughness: 0.1,
    });
    const satelliteNode1 = new THREE.Mesh(nodeGeo, nodeMat);
    const satelliteNode2 = new THREE.Mesh(nodeGeo, nodeMat);
    ringGroup.add(satelliteNode1);
    ringGroup.add(satelliteNode2);

    // Part 8: Diplomatic City Beacon Pins with Pulsing Energy Rings
    const pinGroup = new THREE.Group();
    globeMesh.add(pinGroup);

    const pinMarkerGeo = new THREE.CylinderGeometry(0.01, 0.024, 0.22, 8);
    pinMarkerGeo.translate(0, 0.11, 0);
    const pinHeadGeo = new THREE.SphereGeometry(0.045, 12, 12);
    pinHeadGeo.translate(0, 0.22, 0);

    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf2deaa,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xd6b875,
      emissiveIntensity: 0.6,
    });

    const pinRings: THREE.Mesh[] = [];

    DIPLOMATIC_CITIES.forEach((city) => {
      const cityPos = latLngToVector3(city.lat, city.lng, globeRadius);

      const cityPinGroup = new THREE.Group();
      cityPinGroup.position.copy(cityPos);
      cityPinGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        cityPos.clone().normalize()
      );

      const shaft = new THREE.Mesh(pinMarkerGeo, pinMat);
      const head = new THREE.Mesh(pinHeadGeo, pinMat);
      cityPinGroup.add(shaft);
      cityPinGroup.add(head);

      // Radiating pulse ring on surface
      const pulseGeo = new THREE.RingGeometry(0.03, 0.09, 24);
      pulseGeo.rotateX(-Math.PI / 2);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xd6b875,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.y = 0.005;
      cityPinGroup.add(pulseMesh);
      pinRings.push(pulseMesh);

      pinGroup.add(cityPinGroup);
    });

    // Part 9: Golden Celestial Star Constellation
    const starCount = 550;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 5.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = radius * Math.cos(phi);

      const isGold = Math.random() > 0.45;
      starColors[i * 3] = isGold ? 0.92 : 0.98;
      starColors[i * 3 + 1] = isGold ? 0.8 : 0.98;
      starColors[i * 3 + 2] = isGold ? 0.5 : 1.0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Interactive Drag Physics Listeners
    const onMouseDown = (e: MouseEvent) => {
      dragRef.current.isDown = true;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;
      dragRef.current.velX = 0;
      dragRef.current.velY = 0;
      setIsUserDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDown || !globeMeshRef.current) return;
      const deltaX = e.clientX - dragRef.current.prevX;
      const deltaY = e.clientY - dragRef.current.prevY;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;

      dragRef.current.velX = deltaX * 0.005;
      dragRef.current.velY = deltaY * 0.005;

      globeMeshRef.current.rotation.y += dragRef.current.velX;
      globeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, globeGroup.rotation.x + dragRef.current.velY));
    };

    const onMouseUp = () => {
      dragRef.current.isDown = false;
      setIsUserDragging(false);
    };

    // Touch support for mobile/tablet
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragRef.current.isDown = true;
        dragRef.current.prevX = e.touches[0].clientX;
        dragRef.current.prevY = e.touches[0].clientY;
        setIsUserDragging(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDown || e.touches.length !== 1 || !globeMeshRef.current) return;
      const deltaX = e.touches[0].clientX - dragRef.current.prevX;
      const deltaY = e.touches[0].clientY - dragRef.current.prevY;
      dragRef.current.prevX = e.touches[0].clientX;
      dragRef.current.prevY = e.touches[0].clientY;

      globeMeshRef.current.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, globeGroup.rotation.x + deltaY * 0.005));
    };

    const onTouchEnd = () => {
      dragRef.current.isDown = false;
      setIsUserDragging(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop with Smooth Momentum & Software GL Guard
    let frameId = 0;
    let lastTime = performance.now();

    function tick() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Inertia drag damping
      if (!dragRef.current.isDown) {
        dragRef.current.velX *= 0.95;
        dragRef.current.velY *= 0.95;

        if (globeMeshRef.current) {
          globeMeshRef.current.rotation.y += dragRef.current.velX;
        }

        // Automatic slow cinematic rotation when not dragging
        if (isRotating && globeMeshRef.current) {
          globeMeshRef.current.rotation.y += delta * 0.18;
          ring1Mesh.rotation.z += delta * 0.09;
          ring2Mesh.rotation.y -= delta * 0.07;
        }
      }

      // Orbital satellites movement
      const time = now * 0.001;
      const r1 = globeRadius * 1.45;
      satelliteNode1.position.set(
        Math.cos(time * 0.85) * r1,
        Math.sin(time * 0.85) * r1 * Math.cos(Math.PI * 0.38),
        Math.sin(time * 0.85) * r1 * Math.sin(Math.PI * 0.38)
      );

      const r2 = globeRadius * 1.68;
      satelliteNode2.position.set(
        Math.cos(-time * 0.65) * r2,
        Math.sin(-time * 0.65) * r2 * 0.45,
        Math.sin(-time * 0.65) * r2
      );

      // Pulse pin rings
      const pulseScale = 1 + (Math.sin(time * 3.2) + 1) * 0.38;
      for (const p of pinRings) {
        p.scale.set(pulseScale, pulseScale, 1);
      }

      // Camera Damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 3.5, delta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      globeGeo.dispose();
      globeMat.dispose();
      globeTexture.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, [isRotating]);

  // Focus directly on city
  const focusOnCity = (city: DiplomaticCity) => {
    setSelectedCity(city);
    setIsRotating(false);

    if (globeMeshRef.current) {
      const targetRotY = -((city.lng + 90) * (Math.PI / 180));
      globeMeshRef.current.rotation.y = targetRotY;
    }

    targetCamPos.current.set(0, 0.1, 5.6);
  };

  const resetToGlobalView = () => {
    setSelectedCity(null);
    setIsRotating(true);
    targetCamPos.current.set(0, 0.2, 7.0);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-[750px] overflow-hidden select-none cursor-grab active:cursor-grabbing">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08090D] via-transparent to-[#08090D]/50" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#08090D]/80 via-transparent to-[#08090D]/80" />

      {/* Drag Hint Tooltip */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101C35]/80 border border-[#D6B875]/30 backdrop-blur-md text-[11px] font-medium text-[#F5F1E8]/90 shadow-lg">
          <RotateCw className="w-3.5 h-3.5 text-[#D6B875] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D Globe: Drag to spin · Click hubs to focus</span>
        </div>
      </div>

      {/* Active City Information Floating Badge */}
      {selectedCity && (
        <div className="absolute top-20 right-6 z-30 max-w-xs p-5 rounded-2xl bg-[#101C35]/95 border border-[#D6B875]/40 shadow-2xl backdrop-blur-xl text-[#F5F1E8] animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B875] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#D6B875]" />
              <span>{selectedCity.committeeMatch}</span>
            </span>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-xs text-white/60 hover:text-white cursor-pointer px-1.5 py-0.5 rounded bg-white/10"
            >
              ✕
            </button>
          </div>
          <h4 className="text-xl font-serif font-bold text-white mb-1">
            {selectedCity.name}
          </h4>
          <div className="text-xs text-[#D6B875] font-semibold mb-2">
            {selectedCity.role}
          </div>
          <p className="text-xs text-[#F5F1E8]/80 leading-relaxed font-normal">
            {selectedCity.description}
          </p>
        </div>
      )}

      {/* Unified Bottom Control Dock (Three.js Skill §5: Ergonomic UI Layout) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[94vw] transition-transform duration-300">
        <div className="flex items-center gap-2 p-2 bg-[#101C35]/85 backdrop-blur-md border border-[#D6B875]/30 rounded-xl shadow-2xl">
          <span className="text-[11px] font-bold text-[#D6B875] uppercase tracking-wider px-2 hidden sm:inline">
            Committees / Chambers:
          </span>

          <button
            onClick={resetToGlobalView}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              !selectedCity && isRotating
                ? 'bg-[#D6B875] text-[#08090D] font-bold shadow-md'
                : 'text-[#F5F1E8]/80 hover:text-[#F5F1E8] hover:bg-white/5'
            }`}
          >
            Global Horizon
          </button>

          <div className="h-4 w-px bg-white/15 mx-0.5" />

          {DIPLOMATIC_CITIES.slice(0, 4).map((city) => (
            <button
              key={city.id}
              onClick={() => focusOnCity(city)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCity?.id === city.id
                  ? 'bg-[#641E35] text-[#F5F1E8] border border-[#D6B875]/50 font-bold'
                  : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-white/5'
              }`}
            >
              {city.name.split(' ')[0]}
            </button>
          ))}

          <div className="h-4 w-px bg-white/15 mx-0.5 hidden md:block" />

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#D6B875] hover:text-[#F2DEAA] rounded hover:bg-white/5 cursor-pointer whitespace-nowrap"
          >
            <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
