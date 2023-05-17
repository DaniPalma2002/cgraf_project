//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, scene, renderer;

var geometry, mesh;

var robot;

var controls, stats;

var animationFlags = new Map([
    ["Q_feet", false],
    ["A_feet", false],
    ["W_legs", false],
    ["S_legs", false],
    ["E_arms", false],
    ["D_arms", false],
    ["R_head", false],
    ["F_head", false]
])

var colors = new Map([
    ["red", 0xFF0000],
    ["green", 0x00FF00],
    ["blue", 0x0000FF],
    ["white", 0xFFFFFF],
    ["black", 0x000000],
    ["silver", 0xC0C0C0],
    ["light red", 0xFFA07A],
    ["dark red", 0x8B0000],
    ["light green", 0x90EE90],
    ["dark green", 0x006400],
    ["light blue", 0xADD8E6],
    ["dark blue", 0x00008B]
]);

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
    createHead();
    
    scene.add(robot);
}

function createChest() {
    'use strict'
    var chest = new THREE.Object3D();
    addCube(chest, 100, 60, 80, 0, 0, 0, "red"); // torso
    addCube(chest, 60, 20, 80, 0, -40, 0, "dark red"); // abdomen
    addCube(chest, 60, 10, 80, 0, -55, 0, "silver"); // waist
 
    robot.add(chest);

}

function createHead() {
    'use strict'
    var head = new THREE.Object3D();
    /* addCube(head, 30, 30, 30, 0, 45, -5, "dark blue"); // head
    addCube(head, 7.5, 5, 2.5, 7.5, 50, 10 + 2.5/2, "silver"); // right eye
    addCube(head, 7.5, 5, 2.5, -7.5, 50, 10 + 2.5/2, "silver"); // left eye
    addCube(head, 5, 20, 10, 17.5, 60, -5, "blue"); // right antenna
    addCube(head, 5, 20, 10, -17.5, 60, -5, "blue"); // left antenna */
    addCube(head, 30, 30, 30, 0, 0, 0, "dark blue"); // head
    addCube(head, 7.5, 5, 2.5, 7.5, 50-45, 10 + 2.5/2 +5, "silver"); // right eye
    addCube(head, 7.5, 5, 2.5, -7.5, 50-45, 10 + 2.5/2 +5, "silver"); // left eye
    addCube(head, 5, 20, 10, 17.5, 60-45, -5+5, "blue"); // right antenna
    addCube(head, 5, 20, 10, -17.5, 60-45, -5+5, "blue"); // left antenna

    var box = new THREE.Box3().setFromObject(head);
    var point = new THREE.Vector3(0, box.min.y, 0);

    var pivot = createPivot(head, point);
    pivot.position.set(0, 30, -5)
    //pivot.rotation.x += 0;
  
    robot.add(pivot);
}

function createPivot(obj, vectorPoint) {

    obj.position.copy(vectorPoint);
    obj.position.multiplyScalar(-1);

    var pivot = new THREE.Group();
    pivot.add(obj);

    return pivot;
}


function addCube(obj, Sx, Sy, Sz, Vx, Vy, Vz, color) {
    'use strict';
    geometry = new THREE.BoxGeometry(Sx, Sy, Sz);
    var material = new THREE.MeshBasicMaterial({ color:colors.get(color), wireframe:false });
    mesh = new THREE.Mesh(geometry, material);
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

    stats = new Stats()
    document.body.appendChild(stats.dom)

    createScene();
    createCamera();

    controls = new THREE.OrbitControls(camera, renderer.domElement);


    render();
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    render();
    controls.update();
    stats.update();

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
        case 70: // F
        case 102: // f
            animationFlags.set("F_head", true);
            break;
        case 82: // R
        case 114: // r
            animationFlags.set("R_head", true);
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}