// Import Three.js
import * as THREE from 'three';

// Create a scene
let scene = new THREE.Scene();

// Create a camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a material
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a cube
let cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Start the animation loop
animate();