//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera;
var scene, renderer;
var controls;
var skydomeGeo, skydomeMat, skydome, moon, light, ambientLight, spotlight;
var ovniBodyGeo, ovniBodyMat, ovniBody, ovniCockpitGeo, ovniCockpitMat, ovniCockpit;

var house, roof, chimney, door, windows;

var tree, tree2, tree3;
var geometry, mesh;

var speed = 10;
var clock, delta;

var ovniflags = new Map([
    ["LEFT", false],
    ["RIGHT", false],
])

var materialFlags = new Map([
    ["LAMBERT", false],
    ["PHONG", false],
    ["TOON", false],
    ["BASIC", false]
])

var projectMeshes = new Map([]);

var materials = new Map([])
let ovni = new THREE.Object3D();


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F8F8);
    scene.add(new THREE.AxesHelper(1000));
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    camera.far = 10000;
    camera.updateProjectionMatrix();
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLight() {
    light = new THREE.DirectionalLight(0xF0C420, 1);
    light.position.set(800, 800, 0);
    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(ambientLight);
    scene.add(light);
}

///////////////
/* MATERIALS */
///////////////

function createHouseMaterials() {
    let orange = [], gray = [];
    orange.push(new THREE.MeshLambertMaterial({ color:0xFF9900}));
    orange.push(new THREE.MeshPhongMaterial({ color:0xFF9900}));
    orange.push(new THREE.MeshToonMaterial({ color:0xFF9900}));
    orange.push(new THREE.MeshBasicMaterial({ color:0xFF9900}));
    materials.set("ORANGE", orange);
    projectMeshes.set("ORANGE", []);
    gray.push(new THREE.MeshLambertMaterial({ color:0xBDBDBD}));
    gray.push(new THREE.MeshPhongMaterial({ color:0xBDBDBD}));
    gray.push(new THREE.MeshToonMaterial({ color:0xBDBDBD}));
    gray.push(new THREE.MeshBasicMaterial({ color:0xBDBDBD}));
    materials.set("GRAY", gray);
    projectMeshes.set("GRAY", []);
}

function createTreeMaterials() {
    let brown = [], green = [];
    brown.push(new THREE.MeshLambertMaterial({ color:0x915100}));
    brown.push(new THREE.MeshPhongMaterial({ color:0x915100}));
    brown.push(new THREE.MeshToonMaterial({ color:0x915100}));
    brown.push(new THREE.MeshBasicMaterial({ color:0x915100}));
    materials.set("BROWN", brown);
    projectMeshes.set("BROWN", []);
    green.push(new THREE.MeshLambertMaterial({ color:0x006400}));
    green.push(new THREE.MeshPhongMaterial({ color:0x006400}));
    green.push(new THREE.MeshToonMaterial({ color:0x006400}));
    green.push(new THREE.MeshBasicMaterial({ color:0x006400}));
    materials.set("GREEN", green);
    projectMeshes.set("GREEN", []);
}

function createOvniMaterials() {
    let gray = [], blue = [], yellow = [];
    gray.push(new THREE.MeshLambertMaterial({ color:0x616161}));
    gray.push(new THREE.MeshPhongMaterial({ color:0x616161}));
    gray.push(new THREE.MeshToonMaterial({ color:0x616161}));
    gray.push(new THREE.MeshBasicMaterial({ color:0x616161}));
    materials.set("DARK-GRAY", gray);
    projectMeshes.set("DARK-GRAY", []);
    blue.push(new THREE.MeshLambertMaterial({ color:0x0288C2}));
    blue.push(new THREE.MeshPhongMaterial({ color:0x0288C2}));
    blue.push(new THREE.MeshToonMaterial({ color:0x0288C2}));
    blue.push(new THREE.MeshBasicMaterial({ color:0x0288C2}));
    materials.set("BLUE", blue);
    projectMeshes.set("BLUE", []);
    yellow.push(new THREE.MeshLambertMaterial({ color:0xF6FF00}));
    yellow.push(new THREE.MeshPhongMaterial({ color:0xF6FF00}));
    yellow.push(new THREE.MeshToonMaterial({ color:0xF6FF00}));
    yellow.push(new THREE.MeshBasicMaterial({ color:0xF6FF00}));
    materials.set("YELLOW", yellow);
    projectMeshes.set("YELLOW", []);
}

function createMoonMaterials() {
    let moon = [];
    let lambert = new THREE.MeshLambertMaterial({ color:0xF0C420});
    lambert.emissive.set(0xF0C420);
    lambert.emissiveIntensity = 0.5;
    moon.push(lambert);
    let phong = new THREE.MeshPhongMaterial({ color:0xF0C420});
    phong.emissive.set(0xF0C420);
    phong.emissiveIntensity = 0.5;
    moon.push(phong);
    let toon = new THREE.MeshToonMaterial({ color:0xF0C420});
    toon.emissive.set(0xF0C420);
    toon.emissiveIntensity = 0.5;
    moon.push(toon);
    let basic = new THREE.MeshBasicMaterial({ color:0xF0C420});
    moon.push(basic);
    materials.set("MOON", moon);
    projectMeshes.set("MOON", []);
}

function createMaterials() {
    createMoonMaterials();
    createHouseMaterials();
    createTreeMaterials();
    createOvniMaterials();
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createGround() {
    'use strict';
    let groundGeo = new THREE.PlaneGeometry(3200, 3200, 100, 100);
    // let displayMat = new THREE.TextureLoader().load('heightmap.png', null, null, onError);
    // let texture = new THREE.TextureLoader().load('Ground.jpeg'); // TODO: change to grass texture
    let displayMat = new THREE.TextureLoader().load('https://cdn.discordapp.com/attachments/545262082778464256/1116593508367732736/heightmap.png');
    let texture = new THREE.TextureLoader().load('https://cdn.discordapp.com/attachments/545262082778464256/1116597726503780433/Ground2.jpeg'); // TODO: change to grass texture
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,2);
    let groundMat = new THREE.MeshPhongMaterial({displacementMap: displayMat, displacementScale: 80, map: texture});

    let ground = new THREE.Mesh(groundGeo, groundMat);
    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -40;
    ground.position.x = 100;
}

function createSkydome() {
    'use strict';
    skydomeGeo = new THREE.SphereGeometry(1500, 32, 32);
    let texture = new THREE.TextureLoader().load('https://cdn.discordapp.com/attachments/545262082778464256/1116597956733317190/Sky.jpeg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,2);
    skydomeMat = new THREE.MeshPhongMaterial({side: THREE.BackSide, map:texture});
    skydome = new THREE.Mesh(skydomeGeo, skydomeMat);
    scene.add(skydome);
}

function createHouse() {
    'use strict';
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        0, 0, 0,  // Vertex 0
        330, 0, 0,  // Vertex 1
        330,  100, 0,  // Vertex 2
        0,  100, 0,  // Vertex 3
        0, 0,  -230,  // Vertex 4
        330, 0,  -230,  // Vertex 5
        330,  100,  -230,  // Vertex 6
        0,  100,  -230,   // Vertex 7
        /* door and windows vertices */
        /* window 1 */
        10, 30, 0,  // Vertex 8
        50, 30, 0,  // Vertex 9
        50, 70, 0,  // Vertex 10
        10, 70, 0,  // Vertex 11
        /* window 2 */
        150, 30, 0,  // Vertex 12
        190, 30, 0,  // Vertex 13
        190, 70, 0,  // Vertex 14
        150, 70, 0,  // Vertex 15
        /* window 3 */
        260, 30, 0,  // Vertex 16
        300, 30, 0,  // Vertex 17
        300, 70, 0,  // Vertex 18
        260, 70, 0,  // Vertex 19
        /* door */
        80, 0, 0,  // Vertex 20
        120, 0, 0,  // Vertex 21
        120, 70, 0,  // Vertex 22
        80, 70, 0,  // Vertex 23
        /* vertices to sub faces 0 */
        0, 70, 0,  // Vertex 24
        330, 70, 0,  // Vertex 25
        10, 0, 0,  // Vertex 26
        0, 30, 0,  // Vertex 27
        80, 30, 0,  // Vertex 28
        120, 30, 0,  // Vertex 29
        330, 30, 0, // Vertex 30
        /* window 4 */
        330, 30, -90,  // Vertex 31
        330, 30, -130,  // Vertex 32
        330, 70, -130,  // Vertex 33
        330, 70, -90,  // Vertex 34

    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        24, 25, 2,  2, 3, 24,   // Face 0.1
        27, 8, 11, 11, 24, 27,  // Face 0.2
        9, 28, 23, 23, 10, 9,   // Face 0.3
        29, 12, 15, 15, 22, 29, // Face 0.4
        13, 16, 19, 19, 14, 13, // Face 0.5
        17, 30, 25, 25, 18, 17, // Face 0.6
        0, 20, 28, 28, 27, 0,    // Face 0.7
        21, 1, 30, 30, 29, 21,   // Face 0.8

        4, 6, 5,  4, 7, 6,   // Face 1
        0, 4, 1,  1, 4, 5,   // Face 2
        1, 5, 2,  2, 5, 6,   // Face 3

        3, 7, 0,  0, 7, 4    // Face 5
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals();
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false  });
    var house = new THREE.Mesh(geometry, materials.get("GRAY")[0]);
    let meshList = projectMeshes.get("GRAY");
    meshList.push(house);
    projectMeshes.set("GRAY", meshList);
    addRoof();
    addChimney();
    addWindows();
    addDoor();
    house.add(roof);
    house.add(chimney);
    house.add(door);
    house.add(windows);
    scene.add(house);
}

function addRoof() {
    'use strict';
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        0, 100, 0,  // Vertex 0
        330, 100, 0,  // Vertex 1
        330,  160, -115,  // Vertex 2
        0,  160, -115,  // Vertex 3
        0, 100,  -230,  // Vertex 4
        330, 100,  -230,  // Vertex 5
        170, 115.6, -30,  // Vertex 6
        250, 115.6, -30,  // Vertex 7
        170, 100, 0,  // Vertex 8
        250, 100, 0,  // Vertex 9
        0, 115.6, -30,  // Vertex 10
        330, 115.6, -30,  // Vertex 11
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        0, 8, 6, 6, 10, 0,   // Face 0.1
        9, 1, 11, 11, 7, 9,   // Face 0.2
        10, 11, 2, 2, 3, 10,   // Face 0.3
        2, 5, 3,  3, 5, 4,   // Face 1
        0, 3, 4,             // Face 2
        1, 5, 2,             // Face 3
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals();
    // var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    roof = new THREE.Mesh(geometry, materials.get("ORANGE")[0]);
    let meshList = projectMeshes.get("ORANGE");
    meshList.push(roof);
    projectMeshes.set("ORANGE", meshList);
}

function addChimney() {
    'use strict';
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        170, 100, 0,  // Vertex 0
        250, 100, 0,  // Vertex 1
        250, 180, 0,  // Vertex 2
        170, 180, 0,  // Vertex 3
        170, 115.6, -30,  // Vertex 4
        250, 115.6, -30,  // Vertex 5
        250, 180, -30,  // Vertex 6
        170, 180, -30,   // Vertex 7
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        1, 2, 0,  0, 2, 3,   // Face 0
        4, 6, 5,  4, 7, 6,   // Face 1
        //0, 4, 1,  1, 4, 5,   // Face 2
        1, 5, 2,  2, 5, 6,   // Face 3
        2, 6, 3,  3, 6, 7,   // Face 4
        3, 7, 0,  0, 7, 4    // Face 5
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals();
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    chimney = new THREE.Mesh(geometry, materials.get("GRAY")[0]);
    let meshList = projectMeshes.get("GRAY");
    meshList.push(chimney);
    projectMeshes.set("GRAY", meshList);
}

function addWindows() {
    'use strict';
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        10, 30, 0,  // Vertex 0
        50, 30, 0,  // Vertex 1
        50, 70, 0,  // Vertex 2
        10, 70, 0,  // Vertex 3

        150, 30, 0,  // Vertex 4
        190, 30, 0,  // Vertex 5
        190, 70, 0,  // Vertex 6
        150, 70, 0,  // Vertex 7

        260, 30, 0,  // Vertex 8
        300, 30, 0,  // Vertex 9
        300, 70, 0,  // Vertex 10
        260, 70, 0,  // Vertex 11
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        1, 2, 0,  0, 2, 3,   // Face 0
        4, 5, 6,  4, 6, 7,   // Face 1
        8, 9, 10,  8, 10, 11,   // Face 2
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals();
    // var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
    windows = new THREE.Mesh(geometry, materials.get("BLUE")[0]);
    let meshList = projectMeshes.get("BLUE");
    meshList.push(windows);
    projectMeshes.set("BLUE", meshList);
}

function addDoor() {
    'use strict';
    var geometry = new THREE.BufferGeometry();
    var vertices = [
        80, 0, 0,  // Vertex 0
        120, 0, 0,  // Vertex 1
        120, 70, 0,  // Vertex 2
        80, 70, 0,  // Vertex 3
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        0, 1, 2, 2, 3, 0     // Face 0
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals();
    // var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
    door = new THREE.Mesh(geometry, materials.get("BROWN")[0]);
    let meshList = projectMeshes.get("BROWN");
    meshList.push(door);
    projectMeshes.set("BROWN", meshList);
}

function addOvniBody(obj,r,d,t){
    geometry = new THREE.SphereGeometry(r,d,t);
    geometry.scale(1.5, 0.5, 1.5);
    // material = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, materials.get("DARK-GRAY")[0]);
    let meshList = projectMeshes.get("DARK-GRAY");
    meshList.push(mesh);
    projectMeshes.set("DARK-GRAY", meshList);
    obj.add(mesh);

}

function addOvniCockPit(obj,r,d,t,a,s){
    'use strict';
    geometry = new THREE.SphereGeometry(r,d,t,a,s);
    geometry.rotateX(-Math.PI/2);
    // material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
    mesh = new THREE.Mesh(geometry, materials.get("BLUE")[0]);
    mesh.position.y = 35;
    let meshList = projectMeshes.get("BLUE");
    meshList.push(mesh);
    projectMeshes.set("BLUE", meshList);
    obj.add(mesh);
}


function addOvniLights1(obj,r,d,radius,angle){ 
    'use strict';
    geometry = new THREE.SphereGeometry(r,d,d);
    // material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, materials.get("YELLOW")[0]); 
    mesh.position.set(radius * Math.cos(angle)*10, -60, radius * Math.sin(angle)*10);    
    let meshList = projectMeshes.get("YELLOW");
    meshList.push(mesh);
    projectMeshes.set("YELLOW", meshList);
    obj.add(mesh);

}

function addOvniLights2(obj,r,d,radius,angle){ 
    'use strict';
    geometry = new THREE.SphereGeometry(r,d,d);
    // material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, materials.get("YELLOW")[0]); 
    mesh.position.set(-(radius * Math.cos(angle))*10, -60, radius * Math.sin(angle)*10);
    let meshList = projectMeshes.get("YELLOW");
    meshList.push(mesh);
    projectMeshes.set("YELLOW", meshList);
    obj.add(mesh);
}



function addOvniBeam(obj,r,d,h,t,y){
    'use strict';
    geometry= new THREE.CylinderGeometry(r,d,h,t);
    // material = new THREE.MeshBasicMaterial({ color: 0xADD8E6});
    mesh= new THREE.Mesh(geometry, materials.get("BLUE")[0]);
    mesh.position.y = y;
    let meshList = projectMeshes.get("BLUE");
    meshList.push(mesh);
    projectMeshes.set("BLUE", meshList);
    spotlight = new THREE.SpotLight(0xFFFFFF, 1, 700, Math.PI/10, 0.5, 0.5);
    obj.add(spotlight);
    obj.add(spotlight.target);
    obj.add(mesh);
}

function createOvni(){
    'use strict';
    addOvniBody(ovni,125,32,32); 
    addOvniCockPit(ovni,100,32,32,0,Math.PI);
    addOvniLights1(ovni,25, 8, 8,150,Math.PI / 4);
    addOvniLights1(ovni,25, 8, 8,-150,-Math.PI / 4);
    addOvniLights2(ovni,25, 8, 8,150,Math.PI / 4);
    addOvniLights2(ovni,25, 8, 8,-150,-Math.PI / 4);
    addOvniBeam(ovni,25,25,50,32,-50);
    scene.add(ovni);
    ovni.position.set(150,500,-100);
}

function createTree(Px, Py, Pz, Sx, Sy, Sz) {
    'use strict';
    let tree = new THREE.Object3D();
    addCilinder(tree, 15, 20, 0, 0, 0, 0, "", 0x915100);
    addCilinder(tree, 15, 70, -15, 32.5, 0, Math.PI/6, 'z', 0x915100);
    addSphere(tree, 50, -30, 75, 0, 1, 0.5, 0.5, 0x006400);
    addCilinder(tree, 10, 45, 15, 25, 0, -Math.PI/4, 'z', 0x915100);
    addSphere(tree, 30, 30, 45, 0, 1, 0.5, 0.5, 0x006400);
    tree.position.x = Px;
    tree.position.y = Py;
    tree.position.z = Pz;
    tree.scale.set(Sx, Sy, Sz);
    return tree;
}

function createTrees() {
    'use strict';
    tree = createTree(-100, 0, -100, 1.5, 1.5, 1.5);
    tree2 = createTree(-250, 0, -100, 1.2, 1.2, 1.2);
    tree3 = createTree(450, 0, -100, 1.3, 1.3, 1.3);
    tree3.rotateY(Math.PI/4);
    tree2.rotateY(-Math.PI/4);
    scene.add(tree);
    scene.add(tree2);
    scene.add(tree3);
}

function createMoon() {
    'use strict';
    moon = new THREE.Object3D();
    geometry = new THREE.SphereGeometry(50, 16);
    // var material = new THREE.MeshStandardMaterial({ color:0xF0C420 });
    mesh = new THREE.Mesh(geometry, materials.get("MOON")[0]);
    mesh.position.set(800, 800, 0);
    let meshList = projectMeshes.get("MOON");
    meshList.push(mesh);
    projectMeshes.set("MOON", meshList);
    moon.add(mesh);
    scene.add(moon);
}

function addCilinder(obj, r, h, Vx, Vy, Vz, rotation, axis, color) {
    'use strict';
    geometry = new THREE.CylinderGeometry(r, r, h, 16);
    // var material = new THREE.MeshBasicMaterial({ color:color, wireframe:false });
    // var material = new THREE.MeshLambertMaterial({ color:color, wireframe:false })
    var material;
    if (color === 0x915100) {
        material = materials.get("BROWN")[0];
    } else {
        var material = new THREE.MeshBasicMaterial({ color:color, wireframe:false });
    }
    mesh = new THREE.Mesh(geometry, material);
    if (rotation !== 0 && axis === 'z') {
        mesh.rotateZ(rotation);
    }
    mesh.position.set(Vx, Vy, Vz);
    if (color === 0x915100) {
        let meshList = projectMeshes.get("BROWN");
        meshList.push(mesh);
        projectMeshes.set("BROWN", meshList);
    }
    obj.add(mesh);
}

function addSphere(obj, r, Vx, Vy, Vz, Sx, Sy, Sz, color) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 16);
    geometry.scale(Sx, Sy, Sz);
    var material;
    if (color === 0x006400) {
        material = materials.get("GREEN")[0];
    } else {
        material = new THREE.MeshBasicMaterial({ color:color, wireframe:false });
    }
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Vx, Vy, Vz);
    if (color === 0x006400) {
        let meshList = projectMeshes.get("GREEN");
        meshList.push(mesh);
        projectMeshes.set("GREEN", meshList);
    }
    obj.add(mesh);
}



////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.xr.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.appendChild( VRButton.createButton( renderer ) );

    renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );

    } );

    createScene();
    createCamera();
    createLight();
    createGround();
    createSkydome();
    createMaterials();
    createMoon();
    createHouse();
    createOvni();
    createTrees();

    clock = new THREE.Clock(true);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    delta = clock.getDelta()
    var newOvniVector = new THREE.Vector3();
    for (let [key, value] of ovniflags) {
        if(value) {
            switch (key) {
                case "LEFT":
                    newOvniVector.x -= speed * 15 * delta;
                    spotlight.target.x += speed * 15 * delta;
                    break;
                case "RIGHT":
                    newOvniVector.x += speed * 15 * delta;
                    spotlight.target.x += speed * 15 * delta;
                    break;
            }
        }
    }
    ovni.position.add(newOvniVector);
    ovni.rotation.y += Math.PI/16* speed * delta;
    let index = 0;
    for (let [key, value] of materialFlags) {
        if (value) {
            for (let [key, value] of projectMeshes) {
                for (let i = 0; i < value.length; i++) {
                    value[i].material = materials.get(key)[index];
                }
            }
            materialFlags.set(key, false);
        }
        index++;
    }
    render();
    controls.update();
    requestAnimationFrame(animate);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 37:
            ovniflags.set("LEFT", true);
            break;
        case 39:
            ovniflags.set("RIGHT", true);
            break;
        case 81:
            materialFlags.set("LAMBERT", true);
            break;
        case 87:
            materialFlags.set("PHONG", true);
            break;
        case 69:
            materialFlags.set("TOON", true);
            break;
        case 82:
            materialFlags.set("BASIC", true);
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
    switch (e.keyCode) {
        case 37: // Arrow Left
            ovniflags.set("LEFT", false);
            break;
        case 39:
            ovniflags.set("RIGHT", false);
            break;
    }

}