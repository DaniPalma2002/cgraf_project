//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera;
var scene, renderer;
var controls;
var skydomeGeo, skydomeMat, skydome, moon, light;
var ovniBodyGeo, ovniBodyMat, ovniBody, ovniCockpitGeo, ovniCockpitMat, ovniCockpit;

var house, roof, chimney, doorAndWindows;

var tree, tree2, tree3;
var geometry, mesh;

var speed = 10;
var clock, delta;

var ovniflags = new Map([
    ["LEFT", false],
    ["RIGHT", false],
])


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
    scene.add(light);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createGround() {
    'use strict';
    const groundGeo = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    let displayMat = new THREE.TextureLoader()
        .load('../images/heightmap.png');

    let texture = new THREE.TextureLoader()
        .load('../images/R.png');

    //displayMat.wrapS = displayMat.wrapT = THREE.RepeatWrapping;
    //displayMat.repeat.set(10, 10);

    const groundMat = new THREE.MeshStandardMaterial({
        //color: 0x00ff00,
        wireframe: false,
        displacementMap: displayMat,
        displacementScale: 80,
        map: texture,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -40;
    ground.position.x = 100;
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
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false  });
    var house = new THREE.Mesh(geometry, material);
    addRoof();
    addChimney();
    addDoorAndWindows();
    house.add(roof);
    house.add(chimney);
    house.add(doorAndWindows);
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
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    roof = new THREE.Mesh(geometry, material);
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
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    chimney = new THREE.Mesh(geometry, material);
}

function addDoorAndWindows() {
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

        80, 0, 0,  // Vertex 12
        120, 0, 0,  // Vertex 13
        120, 70, 0,  // Vertex 14
        80, 70, 0,  // Vertex 15
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        1, 2, 0,  0, 2, 3,   // Face 0
        4, 5, 6,  4, 6, 7,   // Face 1
        8, 9, 10,  8, 10, 11,   // Face 2
        12, 13, 14,  12, 14, 15,   // Face 3
        /*0, 4, 1,  1, 4, 5,   // Face 2
        1, 5, 2,  2, 5, 6,   // Face 3
        2, 6, 3,  3, 6, 7,   // Face 4
        3, 7, 0,  0, 7, 4    // Face 5 */
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
    doorAndWindows = new THREE.Mesh(geometry, material);
}

function createSkydome() {
    'use strict';
    skydomeGeo = new THREE.SphereGeometry(1500, 32, 32);
    //var texture = new THREE.TextureLoader().load('../images/skydome.jpg');
    skydomeMat = new THREE.MeshBasicMaterial({ color: 0x000033, side: THREE.BackSide });
    skydome = new THREE.Mesh(skydomeGeo, skydomeMat);
    scene.add(skydome);
}

function createOvniBody(){
    'use strict';
    ovniBodyGeo = new THREE.SphereGeometry(125,32,32,0,Math.PI);
    ovniBodyGeo.rotateX(Math.PI/2);
    ovniBodyMat = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    ovniBody = new THREE.Mesh(ovniBodyGeo,ovniBodyMat);
    scene.add(ovniBody);
    ovniBody.position.y = 600;


}

function createOvniCockPit(){
    'use strict';
    ovniCockpitGeo = new THREE.SphereGeometry(80,32,32,0,Math.PI);
    ovniCockpitGeo.rotateX(-Math.PI/2);
    ovniCockpitMat = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
    ovniCockpit = new THREE.Mesh(ovniCockpitGeo,ovniCockpitMat);
    ovniCockpit.position.y = -30;
    ovniBody.add(ovniCockpit);


}


function createOvniLights1(){
    'use strict';
    var ovniLightGeo = new THREE.SphereGeometry(25, 8, 8);
    var ovniLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var ovniLight = new THREE.Mesh(ovniLightGeo, ovniLightMat);
    var angle = -Math.PI / 4;
    var radius = 75;
    ovniLight.position.set(radius * Math.cos(angle), -100, radius * Math.sin(angle));
    ovniBody.add(ovniLight);

}

function createOvniLights2(){
    'use strict';
    var ovniLightGeo = new THREE.SphereGeometry(25, 8, 8);
    var ovniLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var ovniLight = new THREE.Mesh(ovniLightGeo, ovniLightMat);
    var angle = Math.PI / 4;
    var radius = 75;
    ovniLight.position.set(radius * Math.cos(angle), -100, radius * Math.sin(angle));
    ovniBody.add(ovniLight);
}

function createOvniLights3(){
    'use strict';
    var ovniLightGeo = new THREE.SphereGeometry(25, 8, 8);
    var ovniLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var ovniLight = new THREE.Mesh(ovniLightGeo, ovniLightMat);
    var angle = Math.PI / 4;
    var radius = 75;
    ovniLight.position.set(-(radius * Math.cos(angle)), -100, radius * Math.sin(angle));
    ovniBody.add(ovniLight);
}

function createOvniLights4(){
    'use strict';
    var ovniLightGeo = new THREE.SphereGeometry(25, 8, 8);
    var ovniLightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var ovniLight = new THREE.Mesh(ovniLightGeo, ovniLightMat);
    var angle = -Math.PI / 4;
    var radius = 75;
    ovniLight.position.set(-(radius * Math.cos(angle)), -100, radius * Math.sin(angle));
    ovniBody.add(ovniLight);
}

function createOvniBeam(){
    'use strict';
    var ovniBeamGeo = new THREE.CylinderGeometry(25,25,50,32);
    var ovniBeamMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6});
    var ovniBeam = new THREE.Mesh(ovniBeamGeo,ovniBeamMaterial);
    ovniBeam.position.y = -110;
    ovniBody.add(ovniBeam);

}

function createOvni(){
    'use strict';
    createOvniBody();
    createOvniCockPit();
    createOvniLights1();
    createOvniLights2();
    createOvniLights3();
    createOvniLights4();
    createOvniBeam();
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
    scene.add(tree);
    scene.add(tree2);
    scene.add(tree3);
}

function createMoon() {
    'use strict';
    moon = new THREE.Object3D();
    geometry = new THREE.SphereGeometry(50, 16);
    var material = new THREE.MeshStandardMaterial({ color:0xF0C420, wireframe:false });
    material.emissive.set(0xF0C420);
    material.emissiveIntensity = 2.5;
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(800, 800, 0);
    moon.add(mesh);
    light = new THREE.DirectionalLight(0xF0C420, 1);
    light.position.set(800, 800, 0);
    scene.add(moon);
    scene.add(light);
}

function addCilinder(obj, r, h, Vx, Vy, Vz, rotation, axis, color) {
    'use strict';
    geometry = new THREE.CylinderGeometry(r, r, h, 16);
    // var material = new THREE.MeshBasicMaterial({ color:color, wireframe:false });
    var material = new THREE.MeshLambertMaterial({ color:color, wireframe:false });
    mesh = new THREE.Mesh(geometry, material);
    if (rotation !== 0 && axis === 'z') {
        mesh.rotateZ(rotation);
    }
    mesh.position.set(Vx, Vy, Vz);
    obj.add(mesh);
}

function addSphere(obj, r, Vx, Vy, Vz, Sx, Sy, Sz, color) {
    'use strict';
    geometry = new THREE.SphereGeometry(r, 16);
    geometry.scale(Sx, Sy, Sz);
    var material = new THREE.MeshBasicMaterial({ color:color, wireframe:false });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Vx, Vy, Vz);
    obj.add(mesh);
}

function createMeshes() {

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
    createMeshes();
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
    if(value){
        switch (key) {
            case "LEFT":
                newOvniVector.x -= speed * 15 * delta;
                break;
            case "RIGHT":
                newOvniVector.x += speed * 15 * delta;
                break;
            }
        }
    }
    ovniBody.position.add(newOvniVector);
    ovniBody.rotation.y += Math.PI/16* speed * delta;
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