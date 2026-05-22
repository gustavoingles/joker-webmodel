import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/OrbitControls.js';

const MODEL_URL = './model/scene.glb';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111418);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0x88aaff, 0.3);
fillLight.position.set(-5, 3, -4);
scene.add(fillLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.minDistance = 0.5;
controls.maxDistance = 50;

const loader = new GLTFLoader();
const loadingEl = document.getElementById('loading');

loader.load(
  MODEL_URL,
  (gltf) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 3;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    model.scale.setScalar(scale);

    model.position.sub(center.multiplyScalar(scale));

    scene.add(model);

    controls.target.set(0, 0, 0);
    controls.update();

    loadingEl.classList.add('hidden');
  },
  (xhr) => {
    if (xhr.lengthComputable) {
      const pct = ((xhr.loaded / xhr.total) * 100).toFixed(0);
      loadingEl.textContent = `Carregando modelo… ${pct}%`;
    }
  },
  (error) => {
    console.error('Erro ao carregar GLB:', error);
    loadingEl.textContent = 'Falha ao carregar modelo. Veja o console.';
  }
);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
