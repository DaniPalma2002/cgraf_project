//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera;
var scene, renderer;
var controls;

var house, roof;

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
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        1, 2, 0,  0, 2, 3,   // Face 0
        4, 6, 5,  4, 7, 6,   // Face 1
        0, 4, 1,  1, 4, 5,   // Face 2
        1, 5, 2,  2, 5, 6,   // Face 3
        2, 6, 3,  3, 6, 7,   // Face 4
        3, 7, 0,  0, 7, 4    // Face 5
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    var house = new THREE.Mesh(geometry, material);
    addRoof();
    house.add(roof);
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
    ];
    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    var indices = [
        1, 2, 0,  0, 2, 3,   // Face 0
        2, 5, 3,  3, 5, 4,   // Face 1
        0, 3, 4,             // Face 2
        1, 5, 2,             // Face 3
    ];
    var indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    roof = new THREE.Mesh(geometry, material);
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