import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(20);
camera.position.setY(15);
camera.position.setX(15);
camera.lookAt(new THREE.Vector3(0, 0, 0));

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Adding cube

const cube_geometry = new THREE.BoxGeometry(7, 7, 7);
const cube_material = new THREE.MeshStandardMaterial({ color: 0x00ff0 });
const cube = new THREE.Mesh(cube_geometry, cube_material);

scene.add(cube);

// torus.rotation.y += 45;
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addRotatingCube() {
  const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube_material = new THREE.MeshStandardMaterial({ color: 0x00ff0 });
  const cube = new THREE.Mesh(cube_geometry, cube_material);

  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  cube.position.set(x, y, z);

  cube.rotateOnAxis(new THREE.Vector3(0.01, 0.005, 0.01), 20);

  scene.add(cube);
  return cube;
}

Array(200).fill().forEach(addRotatingCube);

const cubes = [];
for(var i = 0; i < 200; i++)
  cubes.push(addRotatingCube)

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  cube.rotation.x -= 0.01;
  cube.rotation.y -= 0.005;
  // cube.rotation.z -= 0.01;

  // for(cube of cubes) {
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.005;
  //   cube.rotation.z += 0.01;
  // }

  controls.update();

  renderer.render(scene, camera);
}

animate()