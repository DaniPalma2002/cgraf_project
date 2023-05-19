//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera,cameraFront, cameraSide, cameraTop, cameraOrtho, cameraPerspective;
var scene, renderer;
var activeCamera;

var geometry, mesh;

var robot;

var headPivot;

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
    cameraFront = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    cameraFront.position.set(0, 0, 200);
    cameraFront.lookAt(scene.position);

    // Side camera
    cameraSide = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    cameraSide.position.set(200, 0, 0);
    cameraSide.lookAt(scene.position);

    // Top camera
    cameraTop = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    cameraTop.position.set(0, 200, 0);
    cameraTop.lookAt(scene.position);

    // Orthographic camera for isometric view
    cameraOrtho = new THREE.OrthographicCamera(-200, 200, 200, -200, 1, 1000);
    cameraOrtho.position.set(200, 200, 200);
    cameraOrtho.lookAt(scene.position);

    // Perspective camera for isometric view
    cameraPerspective = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.set(200, 200, 200);
    cameraPerspective.lookAt(scene.position);

    activeCamera = cameraFront; // Set the initial active camera as front camera
    scene.add(activeCamera);
}

function setActiveCamera(camera) {
    scene.remove(activeCamera); // Remove the current active camera from the scene
    activeCamera = camera; // Set the new active camera
    scene.add(activeCamera); // Add the new active camera to the scene
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
    addCube(head, 30, 30, 30, 0, 0, 0, "dark blue"); // head
    addCube(head, 7.5, 5, 2.5, 7.5, 50-45, 10 + 2.5/2 +5, "silver"); // right eye
    addCube(head, 7.5, 5, 2.5, -7.5, 50-45, 10 + 2.5/2 +5, "silver"); // left eye
    addCube(head, 5, 20, 10, 17.5, 60-45, -5+5, "blue"); // right antenna
    addCube(head, 5, 20, 10, -17.5, 60-45, -5+5, "blue"); // left antenna

    var box = new THREE.Box3().setFromObject(head);
    var point = new THREE.Vector3(0, box.min.y, 0);

    headPivot = createPivot(head, point);
    headPivot.position.set(0, 30, -5)

    robot.add(headPivot);
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
    renderer.render(scene, activeCamera);
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

    controls = new THREE.OrbitControls(activeCamera, renderer.domElement);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    for (let [key, value] of animationFlags) {
        if (value) {
            switch (key) {
                case "Q_feet":
                    break
                case "A_feet":
                    break
                case "W_legs":
                    break
                case "S_legs":
                    break
                case "E_arms":
                    break
                case "D_arms":
                    break
                case "R_head":
                    if (headPivot.rotation.x > -Math.PI)
                        headPivot.rotation.x -= Math.PI/16;
                    else
                        animationFlags.set(key, false);
                    break
                case "F_head":
                    if (headPivot.rotation.x < 0)
                        headPivot.rotation.x += Math.PI/16;
                    else
                        animationFlags.set(key, false);
                    break
            }
        }
    }



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
            //headPivot.rotation.x += Math.PI/16;
            animationFlags.set("F_head", !animationFlags.get("F_head"));
            break;
        case 82: // R
        case 114: // r
            //headPivot.rotation.x -= Math.PI/16;
            animationFlags.set("R_head", !animationFlags.get("R_head"));
            break;
        case 49: // 1 key (front view)
            setActiveCamera(cameraFront);
            break;
        case 50: // 2 key (side view)
            setActiveCamera(cameraSide);
            break;
        case 51: // 3 key (top view)
            setActiveCamera(cameraTop);
            break;
        case 52: // 4 key (isometric - orthogonal projection)
            setActiveCamera(cameraOrtho);
            break;
        case 53: // 5 key (isometric - perspective projection)
            setActiveCamera(cameraPerspective);
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}