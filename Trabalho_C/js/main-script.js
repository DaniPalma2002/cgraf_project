//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera;
var scene, renderer;
var controls;

var house, roof, chimney, doorAndWindows;

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

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createGround() {
    'use strict';
    const groundGeo = new THREE.PlaneGeometry(500, 500, 250, 250);
    let displayMat = new THREE.TextureLoader()
        .load('../images/heightmap.png');
    
    //displayMat.wrapS = displayMat.wrapT = THREE.RepeatWrapping;
    //displayMat.repeat.set(10, 10);

    const groundMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        wireframe: true,
        displacementMap: displayMat,
        displacementScale: 50,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;
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
        10, 30, 0,  // Vertex 8
        50, 30, 0,  // Vertex 9
        50, 70, 0,  // Vertex 10
        10, 70, 0,  // Vertex 11

        150, 30, 0,  // Vertex 12
        190, 30, 0,  // Vertex 13
        190, 70, 0,  // Vertex 14
        150, 70, 0,  // Vertex 15

        260, 30, 0,  // Vertex 16
        300, 30, 0,  // Vertex 17
        300, 70, 0,  // Vertex 18
        260, 70, 0,  // Vertex 19

        80, 0, 0,  // Vertex 20
        120, 0, 0,  // Vertex 21
        120, 70, 0,  // Vertex 22
        80, 70, 0,  // Vertex 23

        0, 70, 0,  // Vertex 24
        330, 70, 0,  // Vertex 25
        10, 0, 0,  // Vertex 26
        0, 30, 0,  // Vertex 27
        80, 30, 0,  // Vertex 28
        120, 30, 0,  // Vertex 29
        330, 30, 0, // Vertex 30

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
        //2, 6, 3,  3, 6, 7,   // Face 4
        3, 7, 0,  0, 7, 4    // Face 5
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
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
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
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
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
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
    var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    doorAndWindows = new THREE.Mesh(geometry, material);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

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
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    //createGround();
    createHouse();
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
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

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}