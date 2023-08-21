import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';

let stats;
let mesh, camera, scene, renderer, effect, composer;
let helper, physicsHelper;

const scriptURL = import.meta.url;
const scriptPath = scriptURL.substring(0, scriptURL.lastIndexOf('/') + 1);
const file = `${scriptPath}index.pmx`;
const clock = new THREE.Clock();
const gammaValue = 1.0;

Ammo().then(function (AmmoLib) {
  Ammo = AmmoLib;
  init(file);
  animate();
});

function init(file) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 30;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);

  const gridHelper = new THREE.PolarGridHelper(5, 8, 3);
  gridHelper.position.y = -10;
  scene.add(gridHelper);

  const ambient = new THREE.AmbientLight(0xe6e6e6, 3);
  scene.add(ambient);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  effect = new OutlineEffect(renderer);

  stats = new Stats();
  container.appendChild(renderer.domElement);
  container.appendChild(stats.dom);

  helper = new MMDAnimationHelper({
    afterglow: 2.0,
  });

  const loader = new MMDLoader();
  loader.load(file, function (mesh) {
    mesh.position.y = -10;
    scene.add(mesh);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 100;

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  helper.update(clock.getDelta());
  composer.render();
  renderer.toneMappingExposure = Math.pow(gammaValue, 1.0);
  renderer.render(scene, camera);
  stats.end();
}
