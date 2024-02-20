// Import Three.js
import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';


// Create a scene
let scene = new THREE.Scene();

// Create a camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Create a renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add fly controls
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 0.1;

controls.autoForward = false;
controls.dragToLook = true;

const gui = new GUI();

// global variables
let pointLight = new THREE.PointLight();
let directionalLight = new THREE.DirectionalLight();
let spotLight = new THREE.SpotLight();
let ambientLight = new THREE.AmbientLight();

let textureLoader = new THREE.TextureLoader();
let brickTexture = textureLoader.load('Bricks084_1K-JPG/Bricks084_1K-JPG_Color.jpg')
let brickTextureNormals = textureLoader.load('Bricks084_1K-JPG/Bricks084_1K-JPG_NormalGL.jpg')
let brickTextureDisplacement = textureLoader.load('Bricks084_1K-JPG/Bricks084_1K-JPG_Displacement.jpg')
let brickTextureRoughness = textureLoader.load('Bricks084_1K-JPG/Bricks084_1K-JPG_Roughness.jpg')
let brickTextureAmbientOcclusion = textureLoader.load('Bricks084_1K-JPG/Bricks084_1K-JPG_AmbientOcclusion.jpg')

let metalTexture = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_Color.jpg')
let metalTextureNormals = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_NormalGL.jpg')
let metalTextureDisplacement = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_Displacement.jpg')
let metalTextureRoughness = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_Roughness.jpg')
let metalTextureAmbientOcclusion = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_AmbientOcclusion.jpg')
let metalTextureMetalness = textureLoader.load('DiamondPlate008C_4K-JPG/DiamondPlate008C_4K-JPG_Metalness.jpg')

let fabricTexture = textureLoader.load('Fabric077_1K-JPG/Fabric077_1K-JPG_Color.jpg')
let fabricTextureNormals = textureLoader.load('Fabric077_1K-JPG/Fabric077_1K-JPG_NormalGL.jpg')
let fabricTextureDisplacement = textureLoader.load('Fabric077_1K-JPG/Fabric077_1K-JPG_Displacement.jpg')
let fabricTextureRoughness = textureLoader.load('Fabric077_1K-JPG/Fabric077_1K-JPG_Roughness.jpg')

let netTexture = textureLoader.load('Net002A_4K-JPG/Net002A_4K-JPG_Color.jpg')
let netTextureNormals = textureLoader.load('Net002A_4K-JPG/Net002A_4K-JPG_NormalGL.jpg')
let netTextureDisplacement = textureLoader.load('Net002A_4K-JPG/Net002A_4K-JPG_Displacement.jpg')
let netTextureRoughness = textureLoader.load('Net002A_4K-JPG/Net002A_4K-JPG_Roughness.jpg')
let netTextureOpacity = textureLoader.load('Net002A_4K-JPG/Net002A_4K-JPG_Opacity.jpg')

let rockTexture = textureLoader.load('Rock030_4K-JPG/Rock030_4K-JPG_Color.jpg')
let rockTextureNormals = textureLoader.load('Rock030_4K-JPG/Rock030_4K-JPG_NormalGL.jpg')
let rockTextureDisplacement = textureLoader.load('Rock030_4K-JPG/Rock030_4K-JPG_Displacement.jpg')
let rockTextureRoughness = textureLoader.load('Rock030_4K-JPG/Rock030_4K-JPG_Roughness.jpg')
let rockTextureAmbientOcclusion = textureLoader.load('Rock030_4K-JPG/Rock030_4K-JPG_AmbientOcclusion.jpg')



let texturesColor = {
    'none': null,
    'bricks': brickTexture,
    'metal': metalTexture,
    'fabric': fabricTexture,
    'net': netTexture,
    'rock': rockTexture,
}

let texturesNormals = {
    'none': null,
    'bricks': brickTextureNormals,
    'metal': metalTextureNormals,
    'fabric': fabricTextureNormals,
    'net': netTextureNormals,
    'rock': rockTextureNormals,
}

let texturesDisplacement = {
    'none': null,
    'bricks': brickTextureDisplacement,
    'metal': metalTextureDisplacement,
    'fabric': fabricTextureDisplacement,
    'net': netTextureDisplacement,
    'rock': rockTextureDisplacement,
}

let texturesRoughness = {
    'none': null,
    'bricks': brickTextureRoughness,
    'metal': metalTextureRoughness,
    'fabric': fabricTextureRoughness,
    'net': netTextureRoughness,
    'rock': rockTextureRoughness,
}

let texturesAmbientOcclusion = {
    'none': null,
    'bricks': brickTextureAmbientOcclusion,
    'metal': metalTextureAmbientOcclusion,
    'net': netTextureOpacity,
    'rock': rockTextureAmbientOcclusion,
}

let texturesOpacity = {
    'none': null,
    'net': netTextureOpacity,
}

let textureMetalness = {
    'none': null,
    'metal': metalTextureMetalness,
}


let lambertMaterial = new THREE.MeshLambertMaterial();
let phongMaterial = new THREE.MeshPhongMaterial();
let physicalMaterial = new THREE.MeshPhysicalMaterial();

let cone, cylinder, sphere;

let cornellBoxParams = {
    'leftWallColour': 0x00ff00,
    'rightWallColour': 0xff0000,
    'backWallColour': 0xffffff,
    'stageColour': 0x222222,
    'floorColour': 0xffffff,
    'ceilingColour': 0xffffff,

    'pointLightIntensity': 20,
    'pointLightColour': 0xffffff,
    'pointLightDistance': 0,
    'pointLightDecay': 1,
    'pointLightPower': 1,

    'directionalLightIntensity': 0,
    'directionalLightColour': 0xffffff,

    'spotLightIntensity': 0,
    'spotLightColour': 0xffffff,
    'spotLightDistance': 0,
    'spotLightDecay': 1,
    'spotLightPower': 1,
    'spotLightAngle': 1,
    'spotLightPenumbra': 0,

    'ambientLightIntensity': 1,
    'ambientLightColour': 0xffffff,
}

let cornellBoxParamsMappingMaterials = {
    'leftWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.rightWallColour }),
    'rightWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.leftWallColour }),
    'backWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.backWallColour }),
    'stageColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.stageColour }),
    'floorColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.floorColour }),
    'ceilingColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.ceilingColour }),
}

let cornellBoxParamsMappingLights = {
    'pointLightIntensity': pointLight,
    'pointLightColour': pointLight,
    'pointLightDistance': pointLight,
    'pointLightDecay': pointLight,
    'pointLightPower': pointLight,

    'directionalLightIntensity': directionalLight,
    'directionalLightColour': directionalLight,

    'spotLightIntensity': spotLight,
    'spotLightColour': spotLight,
    'spotLightDistance': spotLight,
    'spotLightDecay': spotLight,
    'spotLightPower': spotLight,
    'spotLightAngle': spotLight,
    'spotLightPenumbra': spotLight,

    'ambientLightIntensity': ambientLight,
    'ambientLightColour': ambientLight,
}

const materialGUI = gui.addFolder('Materials');
const lightingGUI = gui.addFolder('Lighting');
for (const key in cornellBoxParams) {
    if (key.includes('Light')) {
        if (key.includes('Colour')) {
            lightingGUI.addColor(cornellBoxParams, key)
                .onChange(value => {
                    cornellBoxParamsMappingLights[key].color.set(value);
                });
        } else {
            lightingGUI.add(cornellBoxParams, key, 0, 100)
                .onChange(value => {
                    cornellBoxParamsMappingLights[key].intensity = value;
                });
        }
    }
    else {
        materialGUI.addColor(cornellBoxParams, key)
            .onChange(value => {
                cornellBoxParamsMappingMaterials[key].color.set(value);
                // cornellBoxParams[key].needsUpdate = true;
            });
    }
}


let colorTypeParameters = ['blendColor', 'color', 'emissive', 'specular', 'sheenColor']
let objectMaterialProperties = {
    'transparent': false,
    'opacity': 1.0,
    'depthTest': true,
    'depthWrite': true,
    'alphaTest': 0.0,
    'alphaHash': false,
    'alphaToCoverage': false,
    'visible': true,
    'side': THREE.FrontSide,
}

const materialPropertiesGUI = gui.addFolder('Object Material Properties')
for (const key in objectMaterialProperties) {
    let paramValue = objectMaterialProperties[key];
    if ((key.includes('side'))) {
        materialPropertiesGUI.add(objectMaterialProperties, key, { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide })
            .onChange(value => {
                objectMaterialProperties[key] = value
                lambertMaterial[key] = value
                phongMaterial[key] = value
                physicalMaterial[key] = value
            });
    } else if (typeof paramValue === 'boolean') {
        materialPropertiesGUI.add(objectMaterialProperties, key).onChange(value => {
            objectMaterialProperties[key] = value
            lambertMaterial[key] = value
            phongMaterial[key] = value
            physicalMaterial[key] = value
        });
    } else if (typeof paramValue === 'number' && colorTypeParameters.includes(key)) {
        materialPropertiesGUI.addColor(objectMaterialProperties, key).onChange(value => {
            objectMaterialProperties[key] = value
            lambertMaterial[key].set(value)
            phongMaterial[key].set(value)
            physicalMaterial[key].set(value)
        });
    } else if (typeof paramValue === 'number') {
        materialPropertiesGUI.add(objectMaterialProperties, key, 0, 1).onChange(value => {
            objectMaterialProperties[key] = value
            lambertMaterial[key] = value
            phongMaterial[key] = value
            physicalMaterial[key] = value
        });
    }
}

let lambertMaterialProperties = {
    'color': 0xaaaa00,
    'emissive': 0x000000,
    'wireframe': false,
    'vertexColors': false,
    'fog': false,
    'envMap': texturesColor['none'],
    'map': texturesColor['none'],
    'alphaMap': texturesColor['none'],
    'normalMap': texturesNormals['none'],
    'combine': THREE.MultiplyOperation,
    'reflectivity': 1,
    'refractionRatio': 0.98,
}


lambertMaterial = new THREE.MeshLambertMaterial({ ...objectMaterialProperties, ...lambertMaterialProperties });
const lambertMaterialPropertiesGUI = materialPropertiesGUI.addFolder('Cone Lambert Material Properties')
for (const key in lambertMaterialProperties) {
    let paramValue = lambertMaterialProperties[key];

    //special cases
    if (key == 'envMap') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;
        });
    } else if (key == 'map') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;
        });
    } else if (key == 'normalMap') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, Object.keys(texturesNormals)).onChange(value => {
            value = texturesNormals[value]
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;
        });
    } else if (key == 'alphaMap') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;
        });
    } else if ((key.includes('combine'))) {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, { MultiplyOperation: THREE.MultiplyOperation, MixOperation: THREE.MixOperation, AddOperation: THREE.AddOperation })
            .onChange(value => {
                lambertMaterialProperties[key] = value;
                lambertMaterial[key] = value;
                lambertMaterial.needsUpdate = true;
            });

        // generic cases
    } else if (typeof paramValue === 'boolean') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key).onChange(value => {
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;

        });
    } else if (typeof paramValue === 'number' && colorTypeParameters.includes(key)) {
        lambertMaterialPropertiesGUI.addColor(lambertMaterialProperties, key).onChange(value => {
            lambertMaterialProperties[key] = value;
            lambertMaterial[key].set(value);
            lambertMaterial.needsUpdate = true;
        });
    } else if (typeof paramValue === 'number') {
        lambertMaterialPropertiesGUI.add(lambertMaterialProperties, key, 0, 1).onChange(value => {
            lambertMaterialProperties[key] = value;
            lambertMaterial[key] = value;
            lambertMaterial.needsUpdate = true;
        });
    }
}


let phongMaterialProperties = {
    'color': 0x309b12,
    'emissive': 0x000000,
    'specular': 0x111111,
    'shininess': 30,
    'wireframe': false,
    'vertexColors': false,
    'fog': false,
    'envMap': texturesColor['none'],
    'map': texturesColor['none'],
    'alphaMap': texturesColor['none'],
    'normalMap': texturesNormals['none'],

    'combine': THREE.MultiplyOperation,
    'reflectivity': 1,
    'refractionRatio': 0.98,
}

phongMaterial = new THREE.MeshPhongMaterial({ ...objectMaterialProperties, ...phongMaterialProperties });
const phongMaterialPropertiesGUI = materialPropertiesGUI.addFolder('Cylinder Phong Material Properties')
for (const key in phongMaterialProperties) {
    let paramValue = phongMaterialProperties[key];

    //special cases
    if (key == 'shininess') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, 0, 100).onChange(value => {
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    } else if (key == 'envMap') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    } else if (key == 'map') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    } else if (key == 'normalMap') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, Object.keys(texturesNormals)).onChange(value => {
            value = texturesNormals[value]
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    } else if (key == 'alphaMap') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    } else if ((key.includes('combine'))) {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, { MultiplyOperation: THREE.MultiplyOperation, MixOperation: THREE.MixOperation, AddOperation: THREE.AddOperation })
            .onChange(value => {
                phongMaterialProperties[key] = value;
                phongMaterial[key] = value;
                phongMaterial.needsUpdate = true;
            });

        // generic cases
    } else if (typeof paramValue === 'boolean') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key).onChange(value => {
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;

        });
    } else if (typeof paramValue === 'number' && colorTypeParameters.includes(key)) {
        phongMaterialPropertiesGUI.addColor(phongMaterialProperties, key).onChange(value => {
            phongMaterialProperties[key] = value;
            phongMaterial[key].set(value);
            phongMaterial.needsUpdate = true;
        });
    } else if (typeof paramValue === 'number') {
        phongMaterialPropertiesGUI.add(phongMaterialProperties, key, 0, 1).onChange(value => {
            phongMaterialProperties[key] = value;
            phongMaterial[key] = value;
            phongMaterial.needsUpdate = true;
        });
    }
}

let physicalMaterialProperties = {
    'color': 0x3f82d9,
    'emissive': 0x000000,
    'roughness': 0.5,
    'metalness': 0.5,
    'ior': 1.5,
    'reflectivity': 1,
    'iridescence': 0.5,
    'iridescenceIOR': 1.5,
    'sheen': 0.5,
    'sheenRoughness': 0.5,
    'sheenColor': 0xffffff,
    'clearcoat': 0.5,
    'clearcoatRoughness': 0.5,
    'specularIntensity': 0.5,
    'flatShading': false,
    'wireframe': false,
    'vertexColors': false,
    'fog': false,
    'envMap': texturesColor['none'],
    'map': texturesColor['none'],
    'normalMap': texturesNormals['none'],
    'roughnessMap': texturesRoughness['none'],
    'metalnessMap': texturesColor['none'],
    'displacementMap': texturesDisplacement['none'],
    // 'irisdesenceMap': texturesColor['none'],
    'alphaMap': texturesOpacity['none'],
}

physicalMaterial = new THREE.MeshPhysicalMaterial({ ...objectMaterialProperties, ...physicalMaterialProperties });
const physicalMaterialPropertiesGUI = materialPropertiesGUI.addFolder('Sphere Physical Material Properties')
for (const key in physicalMaterialProperties) {
    let paramValue = physicalMaterialProperties[key];

    //special cases
    if (key == 'envMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'map') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'normalMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesNormals)).onChange(value => {
            value = texturesNormals[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'alphaMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesOpacity)).onChange(value => {
            value = texturesColor[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'roughnessMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesRoughness)).onChange(value => {
            value = texturesRoughness[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'metalnessMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(textureMetalness)).onChange(value => {
            value = texturesColor[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'displacementMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesDisplacement)).onChange(value => {
            value = texturesDisplacement[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    } else if (key == 'irisdesenceMap') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, Object.keys(texturesColor)).onChange(value => {
            value = texturesColor[value]
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });

        // generic cases
    } else if (typeof paramValue === 'boolean') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key).onChange(value => {
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;

        });
    } else if (typeof paramValue === 'number' && colorTypeParameters.includes(key)) {
        physicalMaterialPropertiesGUI.addColor(physicalMaterialProperties, key).onChange(value => {
            physicalMaterialProperties[key] = value;
            physicalMaterial[key].set(value);
            physicalMaterial.needsUpdate = true;
        });
    } else if (typeof paramValue === 'number') {
        physicalMaterialPropertiesGUI.add(physicalMaterialProperties, key, 0, 1).onChange(value => {
            physicalMaterialProperties[key] = value;
            physicalMaterial[key] = value;
            physicalMaterial.needsUpdate = true;
        });
    }
}


createRoomMeshes();
createObjects();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(0.5);
    renderer.render(scene, camera);
}

function createRoomMeshes() {
    // Add axes helper
    let axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);


    let roomSize = 10
    let roomHeight = 13

    let cage = new THREE.Object3D();
    let room = new THREE.Object3D();

    // Create Pillars using BoxGeometry
    let pillarGeometry = new THREE.BoxGeometry(0.5, roomHeight, 0.5);
    let pillarMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.5 });

    let pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar1.position.set(roomSize / 2, 0, roomSize / 2);
    cage.add(pillar1);

    let pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar2.position.set(-roomSize / 2, 0, roomSize / 2);
    cage.add(pillar2);

    let pillar3 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar3.position.set(roomSize / 2, 0, -roomSize / 2);
    cage.add(pillar3);

    let pillar4 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar4.position.set(-roomSize / 2, 0, -roomSize / 2);
    cage.add(pillar4);

    // create upper walls
    let topWallHeight = roomHeight / 6
    let topWallPos = roomHeight / 2 - (topWallHeight) / 2

    let wallGeometry = new THREE.BoxGeometry(0.1, topWallHeight, roomSize);
    let wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    let leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.set(roomSize / 2, topWallPos, 0);
    room.add(leftWall);

    let rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.position.set(-roomSize / 2, topWallPos, 0);
    room.add(rightWall);

    let backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.rotation.y = Math.PI / 2;
    backWall.position.set(0, topWallPos, -roomSize / 2);
    room.add(backWall);

    let frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.rotation.y = Math.PI / 2;
    frontWall.position.set(0, topWallPos, roomSize / 2);
    room.add(frontWall);

    //create roof
    let roofGeometry = new THREE.BoxGeometry(roomSize, 0.1, roomSize);
    let roof = new THREE.Mesh(roofGeometry, cornellBoxParamsMappingMaterials['ceilingColour']);
    roof.position.set(0, roomHeight / 2, 0);
    room.add(roof);

    let floorGeometry = new THREE.BoxGeometry(roomSize, 0.1, roomSize);
    let floor = new THREE.Mesh(floorGeometry, cornellBoxParamsMappingMaterials['floorColour']);
    floor.position.set(0, -roomHeight / 2, 0);
    room.add(floor);


    let UpperWallPillarGeo = new THREE.BoxGeometry(10.5, 0.5, 0.5);

    let UpperWallPillarFront = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarFront.position.set(0, topWallPos - topWallHeight / 2, roomSize / 2);
    cage.add(UpperWallPillarFront);

    let UpperWallPillarLeft = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarLeft.position.set(roomSize / 2, topWallPos - topWallHeight / 2, 0);
    UpperWallPillarLeft.rotation.y = Math.PI / 2;
    cage.add(UpperWallPillarLeft);

    let UpperWallPillarBack = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarBack.position.set(0, topWallPos - topWallHeight / 2, -roomSize / 2);
    cage.add(UpperWallPillarBack);

    let UpperWallPillarRight = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarRight.position.set(-roomSize / 2, topWallPos - topWallHeight / 2, 0);
    UpperWallPillarRight.rotation.y = Math.PI / 2;
    cage.add(UpperWallPillarRight);


    let UpperWallPillarFront2 = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarFront2.position.set(0, topWallPos + topWallHeight / 2, roomSize / 2);
    cage.add(UpperWallPillarFront2);

    let UpperWallPillarLeft2 = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarLeft2.position.set(roomSize / 2, topWallPos + topWallHeight / 2, 0);
    UpperWallPillarLeft2.rotation.y = Math.PI / 2;
    cage.add(UpperWallPillarLeft2);

    let UpperWallPillarBack2 = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarBack2.position.set(0, topWallPos + topWallHeight / 2, -roomSize / 2);
    cage.add(UpperWallPillarBack2);

    let UpperWallPillarRight2 = new THREE.Mesh(UpperWallPillarGeo, pillarMaterial);
    UpperWallPillarRight2.position.set(-roomSize / 2, topWallPos + topWallHeight / 2, 0);
    UpperWallPillarRight2.rotation.y = Math.PI / 2;
    cage.add(UpperWallPillarRight2);

    room.add(cage);

    // create stage
    let stageHeight = 1
    let stageGeometry = new THREE.BoxGeometry(roomSize - roomSize / 5, stageHeight, roomSize - roomSize / 5);
    let stageMaterial = new THREE.MeshStandardMaterial({ color: 0x0101010 });
    let stage = new THREE.Mesh(stageGeometry, cornellBoxParamsMappingMaterials['stageColour']);
    stage.position.set(0, -roomHeight / 2 + stageHeight / 2, 0);
    room.add(stage);

    //create telelumen walls
    let telelumenWallHeight = roomHeight - topWallHeight;

    let telelumenWallGeometry = new THREE.BoxGeometry(0.1, telelumenWallHeight, roomSize);


    let teleWallRight = new THREE.Mesh(telelumenWallGeometry, cornellBoxParamsMappingMaterials['rightWallColour']);
    teleWallRight.position.set(roomSize / 2, 0 - topWallHeight / 2, 0);
    room.add(teleWallRight);


    let teleWallLeft = new THREE.Mesh(telelumenWallGeometry, cornellBoxParamsMappingMaterials['leftWallColour']);
    teleWallLeft.position.set(-roomSize / 2, 0 - topWallHeight / 2, 0);
    room.add(teleWallLeft);


    let teleWallBack = new THREE.Mesh(telelumenWallGeometry, cornellBoxParamsMappingMaterials['backWallColour']);
    teleWallBack.rotation.y = Math.PI / 2;
    teleWallBack.position.set(0, 0 - topWallHeight / 2, -roomSize / 2);
    room.add(teleWallBack);

    scene.add(room)


    let table = createTable();
    room.add(table)


    //create telelumen lights
    let lightPos = roomHeight / 2 - 0.2
    createLights(room, lightPos)

    room.position.y = 1
    return cage, room
}

function createLights(meshToAddTo, lightPos) {

    pointLight.color.set(cornellBoxParams.pointLightColour);
    pointLight.position.set(0, lightPos, 0);
    pointLight.power = cornellBoxParams.pointLightPower;
    pointLight.intensity = cornellBoxParams.pointLightIntensity;
    pointLight.distance = cornellBoxParams.pointLightDistance;
    pointLight.decay = cornellBoxParams.pointLightDecay;
    meshToAddTo.add(pointLight);


    directionalLight.color.set(cornellBoxParams.directionalLightColour);
    directionalLight.intensity = cornellBoxParams.directionalLightIntensity;
    directionalLight.position.set(0, lightPos, 0);
    directionalLight.target.position.set(0, 0, 0);
    meshToAddTo.add(directionalLight);

    spotLight.color.set(cornellBoxParams.spotLightColour);
    spotLight.intensity = cornellBoxParams.spotLightIntensity;
    spotLight.distance = cornellBoxParams.spotLightDistance;
    spotLight.decay = cornellBoxParams.spotLightDecay;
    spotLight.power = cornellBoxParams.spotLightPower;
    spotLight.angle = cornellBoxParams.spotLightAngle;
    spotLight.penumbra = cornellBoxParams.spotLightPenumbra;

    spotLight.position.set(0, lightPos, 0);
    // spotLight.target.position.set(0, 0, 0);
    meshToAddTo.add(spotLight);

    ambientLight.color.set(cornellBoxParams.ambientLightColour);
    ambientLight.intensity = cornellBoxParams.ambientLightIntensity;
    ambientLight.position.set(0, lightPos, 0);
    meshToAddTo.add(ambientLight);

    return pointLight, directionalLight, spotLight, ambientLight
}


function createTable() {

    let tableSize = 5
    let tableHeight = 3.3
    let tablePosY = -2
    let tableTopGeo = new THREE.BoxGeometry(tableSize, 0.1, tableSize);
    let tableTopMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    let tableTop = new THREE.Mesh(tableTopGeo, tableTopMaterial);
    tableTop.position.set(0, tablePosY, 0);

    let tableMesh = new THREE.Object3D();
    tableMesh.add(tableTop);

    let tableSupportGeo = new THREE.BoxGeometry(0.3, 0.3, tableSize - 1);
    let tableSupportMesh1 = new THREE.Mesh(tableSupportGeo, tableTopMaterial);
    tableSupportMesh1.position.set(tableSize / 2 - tableSize / 10, tablePosY - tableSize / 10, 0);
    tableMesh.add(tableSupportMesh1);

    let tableSupportMesh2 = new THREE.Mesh(tableSupportGeo, tableTopMaterial);
    tableSupportMesh2.position.set(-tableSize / 2 + tableSize / 10, tablePosY - tableSize / 10, 0);
    tableMesh.add(tableSupportMesh2);

    let tableSupportMeshBottom1 = new THREE.Mesh(tableSupportGeo, tableTopMaterial);
    tableSupportMeshBottom1.position.set(tableSize / 2 - tableSize / 10, tablePosY - tableHeight, 0);
    tableMesh.add(tableSupportMeshBottom1);

    let tableSupportMeshBottom2 = new THREE.Mesh(tableSupportGeo, tableTopMaterial);
    tableSupportMeshBottom2.position.set(-tableSize / 2 + tableSize / 10, tablePosY - tableHeight, 0);
    tableMesh.add(tableSupportMeshBottom2);

    let tablePillarGeo = new THREE.BoxGeometry(0.3, tableHeight, 0.3);
    let tablePillar1 = new THREE.Mesh(tablePillarGeo, tableTopMaterial);
    tablePillar1.position.set(tableSize / 2 - tableSize / 10, tablePosY - tableHeight / 2, 0);
    tableMesh.add(tablePillar1);

    let tablePillar2 = new THREE.Mesh(tablePillarGeo, tableTopMaterial);
    tablePillar2.position.set(-tableSize / 2 + tableSize / 10, tablePosY - tableHeight / 2, 0);
    tableMesh.add(tablePillar2);

    scene.add(tableMesh)
    return tableMesh;
}


function createObjects() {
    let coneGeo = new THREE.ConeGeometry(1, 2, 20);
    // let cone = new THREE.Mesh(coneGeo, cornellBoxParamsMappingMaterials['coneColour']);
    cone = new THREE.Mesh(coneGeo, lambertMaterial);
    cone.position.set(-1.5, 0, -1);
    scene.add(cone);

    let cylinderGeo = new THREE.CylinderGeometry(1, 1, 2, 20);
    cylinder = new THREE.Mesh(cylinderGeo, phongMaterial);
    cylinder.position.set(1.5, 0, -1);
    scene.add(cylinder);

    let sphereGeo = new THREE.SphereGeometry(1, 20, 20);
    sphere = new THREE.Mesh(sphereGeo, physicalMaterial);
    sphere.position.set(0, 0, 1);
    scene.add(sphere);
}


// Start the animation loop
animate();