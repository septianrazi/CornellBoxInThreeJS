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



let cornellBoxParams = {
    'leftWallColour': 0x00ff00,
    'rightWallColour': 0xff0000,
    'backWallColour': 0xffffff,
    'stageColour': 0x222222,
    'floorColour': 0xffffff,
    'ceilingColour': 0xffffff,
    'coneColour': 0xffff00,
    'cylinderColour': 0x00ff00,
    'sphereColour': 0x0000ff,

    'pointLightIntensity': 0,
    'pointLightColour': 0xffffff,
    'pointLightDistance': 0,
    'pointLightDecay': 1,
    'pointLightPower': 1,

    'directionalLightIntensity': 1,
    'directionalLightColour': 0xffffff,

    'spotLightIntensity': 1,
    'spotLightColour': 0xffffff,
    'spotLightDistance': 0,
    'spotLightDecay': 1,
    'spotLightPower': 1,
    'spotLightAngle': 1,
    'spotLightPenumbra': 0,

    'ambientLightIntensity': 0,
    'ambientLightColour': 0xffffff,
}

let cornellBoxParamsMappingMaterials = {
    'leftWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.rightWallColour }),
    'rightWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.leftWallColour }),
    'backWallColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.backWallColour }),
    'stageColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.stageColour }),
    'floorColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.floorColour }),
    'ceilingColour': new THREE.MeshStandardMaterial({ color: cornellBoxParams.ceilingColour }),
    'coneColour': new THREE.MeshLambertMaterial({ color: cornellBoxParams.coneColour }),
    'cylinderColour': new THREE.MeshPhongMaterial({ color: cornellBoxParams.cylinderColour }),
    'sphereColour': new THREE.MeshPhysicalMaterial({ color: cornellBoxParams.sphereColour }),
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

createRoomMeshes();
createObjects();

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

    pointLight.color.set(cornellBoxParams.pointLightColor);
    pointLight.position.set(0, lightPos, 0);

    pointLight.intensity = cornellBoxParams.pointLightIntensity;
    pointLight.distance = cornellBoxParams.pointLightDistance;
    pointLight.decay = cornellBoxParams.pointLightDecay;
    pointLight.power = cornellBoxParams.pointLightPower;

    meshToAddTo.add(pointLight);


    directionalLight.color.set(cornellBoxParams.directionalLightColor);
    directionalLight.intensity = cornellBoxParams.directionalLightIntensity;
    directionalLight.position.set(0, lightPos, 0);
    directionalLight.target.position.set(0, 0, 0);
    meshToAddTo.add(directionalLight);

    spotLight.color.set(cornellBoxParams.spotLightColor);
    spotLight.intensity = cornellBoxParams.spotLightIntensity;
    spotLight.distance = cornellBoxParams.spotLightDistance;
    spotLight.decay = cornellBoxParams.spotLightDecay;
    spotLight.power = cornellBoxParams.spotLightPower;
    spotLight.angle = cornellBoxParams.spotLightAngle;
    spotLight.penumbra = cornellBoxParams.spotLightPenumbra;

    spotLight.position.set(0, lightPos, 0);
    // spotLight.target.position.set(0, 0, 0);
    meshToAddTo.add(spotLight);

    ambientLight.color.set(cornellBoxParams.ambientLightColor);
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
    let cone = new THREE.Mesh(coneGeo, cornellBoxParamsMappingMaterials['coneColour']);
    cone.position.set(-1, 0, -1);
    scene.add(cone);

    let cylinderGeo = new THREE.CylinderGeometry(1, 1, 2, 20);
    let cylinder = new THREE.Mesh(cylinderGeo, cornellBoxParamsMappingMaterials['cylinderColour']);
    cylinder.position.set(1, 0, -1);
    scene.add(cylinder);

    let sphereGeo = new THREE.SphereGeometry(1, 20, 20);
    let sphere = new THREE.Mesh(sphereGeo, cornellBoxParamsMappingMaterials['sphereColour']);
    sphere.position.set(0, 0, 2);
    scene.add(sphere);
}


// Start the animation loop
animate();