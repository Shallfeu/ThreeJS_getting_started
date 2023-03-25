import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import './style.css';

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('./public/textures/base.jpg');
const normalTexture2 = textureLoader.load('./public/textures/lines.jpg');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Debug
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene();

// Geometry
const sphere = new THREE.SphereGeometry(0.5, 64, 64);
const torus1 = new THREE.TorusGeometry(0.1, 0.03, 30, 100);
const torus2 = new THREE.TorusGeometry(0.2, 0.03, 30, 100);
const torus3 = new THREE.TorusGeometry(0.3, 0.03, 30, 100);
const knot = new THREE.TorusKnotGeometry(0.22, 0.3, 77, 8, 20, 9);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: '#474247',
    roughness: 0.2,
    metalness: 0.7,
    normalMap: normalTexture,
});

const material2 = new THREE.MeshStandardMaterial({
    color: '#474247',
    roughness: 0.2,
    metalness: 0.2,
    normalMap: normalTexture2,
});

const material3 = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 1,
});

// Mesh
const sphereMesh = new THREE.Mesh(sphere, material);

const knotMesh = new THREE.Mesh(knot, material2);

const torusMesh1 = new THREE.Mesh(torus1, material2);
torusMesh1.position.x = -2;

const torusMesh2 = new THREE.Mesh(torus2, material3);
torusMesh2.position.x = -2;

const torusMesh3 = new THREE.Mesh(torus3, material2);
torusMesh3.position.x = -2;
torusMesh3.rotation.y = 180;

scene.add(sphereMesh);
scene.add(torusMesh1);
scene.add(torusMesh2);
scene.add(torusMesh3);
scene.add(knotMesh);

// Light 1
const light = new THREE.PointLight(0xffffff, 0.1);
light.position.set(3, 3, -1.6);
light.intensity = 0.2;
// scene.add(light);

// const lightFld1 = gui.addFolder('Light 1');

// lightFld1.add(light.position, 'x').min(-3).max(3).step(0.1);
// lightFld1.add(light.position, 'y').min(-6).max(3).step(0.1);
// lightFld1.add(light.position, 'z').min(-6).max(3).step(0.1);
// lightFld1.add(light, 'intensity').min(0).max(10).step(0.1);

// const lightHelper = new THREE.PointLightHelper(light, 1);
// scene.add(lightHelper);

// Light 2
const light2 = new THREE.PointLight(0xff0000, 2);
light2.position.set(-3, 3, -5);
light2.intensity = 10;
scene.add(light2);

// const lightFld2 = gui.addFolder('Light 2');

// lightFld2.add(light2.position, 'x').min(-3).max(3).step(0.1);
// lightFld2.add(light2.position, 'y').min(-6).max(3).step(0.1);
// lightFld2.add(light2.position, 'z').min(-6).max(3).step(0.1);
// lightFld2.add(light2, 'intensity').min(0).max(10).step(0.1);

// const lightHelper2 = new THREE.PointLightHelper(light2, 1);
// scene.add(lightHelper2);

// Light 3
const light3 = new THREE.PointLight(0x64f06, 2);
light3.position.set(3, -3, -5);
light3.intensity = 10;
scene.add(light3);

// const lightFld3 = gui.addFolder('Light 3');

// lightFld3.add(light3.position, 'x').min(-3).max(3).step(0.1);
// lightFld3.add(light3.position, 'y').min(-6).max(3).step(0.1);
// lightFld3.add(light3.position, 'z').min(-6).max(3).step(0.1);
// lightFld3.add(light3, 'intensity').min(0).max(10).step(0.1);

// const light3Color = {
//     color: 0x860089,
// };
// lightFld3.addColor(light3Color, 'color').onChange(() => {
//     light3.color.set(light3Color.color);
// });

// const lightHelper3 = new THREE.PointLightHelper(light3, 1);
// scene.add(lightHelper3);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500);
camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

// Controlls
const controlls = new OrbitControls(camera, canvas);
controlls.enabled = false;
controlls.enableDamping = false;
controlls.enablePan = false;
controlls.enableZoom = true;
controlls.autoRotate = true;
controlls.autoRotateSpeed = 5;

// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const clock = new THREE.Clock();

const loop = () => {
    const elapsedTime = clock.getElapsedTime();

    sphereMesh.rotation.y = 0.3 * elapsedTime;
    knotMesh.rotation.z = -0.1 * elapsedTime;
    torusMesh1.rotation.y = 0.8 * elapsedTime;
    torusMesh2.rotation.x = 0.8 * elapsedTime;
    torusMesh3.rotation.x = 0.8 * elapsedTime;

    // controlls.update();
    renderer.render(scene, camera);
    // Call again on the next frame
    window.requestAnimationFrame(loop);
};

loop();

// Timeline effects

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(sphereMesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });

const t2 = gsap.timeline({ defaults: { duration: 1 } });

// Mouse animation color
// let mouseDown = false;
// let rgb = [];

// window.addEventListener('mousedown', () => {
//     mouseDown = true;
// });
// window.addEventListener('mouseup', () => {
//     mouseDown = false;
// });
// window.addEventListener('mousemove', (e) => {
//     if (mouseDown) {
//         rgb = [Math.round(e.pageX / sizes.width) * 255, Math.round(e.pageY / sizes.width) * 255, 150];
//     }
//     let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
//     gsap.to(mesh.material.color, newColor);
// });
