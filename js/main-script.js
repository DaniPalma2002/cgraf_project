//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, scene, renderer;

var geometry, mesh;

var material = new THREE.MeshBasicMaterial({color: 0x000000});

var robot;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xF8F8FF);

    scene.add(new THREE.AxesHelper(100));

    createRobot();

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(100,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;
    camera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot() {
    'use strict'
    robot = new THREE.Object3D();
    createChest();
    scene.add(robot);
}

function createChest() {
    'use strict'
    var chest = new THREE.Object3D();
    addCube(chest, 100, 60, 80, 0, 0, 0, "0xff0000"); // torso
    addCube(chest, 60, 20, 80, 0, -40, 0, "0xff0000"); // abdomen
    addCube(chest, 60, 10, 80, 0, -55, 0, "0xff0000"); // waist
    robot.add(chest);
}

function addCube(obj, Sx, Sy, Sz, Vx, Vy, Vz, color) {
    'use strict';
    geometry = new THREE.BoxGeometry(Sx, Sy, Sz);
    mesh = new THREE.Mesh(geometry, material);
    mesh.material.color.setHex( color );
    mesh.position.set(Vx, Vy, Vz);
    obj.add(mesh);
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

    render();
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    render();

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