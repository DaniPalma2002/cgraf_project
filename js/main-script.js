//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera,cameraFront, cameraSide, cameraTop, cameraOrtho, cameraPerspective;
var scene, renderer;
var activeCamera;

var geometry, mesh;

var robot;

var chest, head, rightMember, leftMember, legs, feet;

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

var wireframeFlag = false;

var colors = new Map([
    ["red", 0xFF0000],
    ["green", 0x00FF00],
    ["blue", 0x0000FF],
    ["white", 0xFFFFFF],
    ["black", 0x000000],
    ["silver", 0xC0C0C0],
    ["iron", 0xA19D94],
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

    scene.background = new THREE.Color(0xF8F8F8);

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

    scene.add(robot);
}

function createChest() {
    'use strict'
    chest = new THREE.Object3D();
    addCube(chest, 100, 60, 80, 0, 0, 0, "red"); // torso
    addCube(chest, 60, 20, 75, 0, -40, 0, "dark red"); // abdomen
    addCube(chest, 60, 10, 75, 0, -55, 0, "silver"); // waist
    
    createHead();
    createSuperiorMembers();
    createLegs();

    //chest.position.set(100, 100, 100);

    robot.add(chest);
}

function createHead() {
    'use strict'
    var geometry = new THREE.BoxGeometry(0, 0, 0);
    var material = new THREE.MeshBasicMaterial();
    head = new THREE.Mesh(geometry, material);
    addCube(head, 30, 30, 30, 0, 15, 0, "dark blue"); // head
    addCube(head, 7.5, 5, 2.5, 7.5, 20, 16.25, "silver"); // right eye
    addCube(head, 7.5, 5, 2.5, -7.5, 20, 16.25, "silver"); // left eye
    addCube(head, 5, 20, 10, 17.5, 30, 0, "blue"); // right antenna
    addCube(head, 5, 20, 10, -17.5, 30, 0, "blue"); // left antenna

    head.position.set(0, 29.99, 5);

    chest.add(head);
}

function createSuperiorMembers() {
    'use strict';
    rightMember = new THREE.Object3D();
    leftMember = new THREE.Object3D();
    addCube(leftMember, 19.99, 59.99, 19.99, 0, 0, -30, "dark red"); // left arm
    addCube(rightMember, 19.99, 59.99, 19.99, 0, 0, -30, "dark red"); // right arm
    addCube(leftMember, 20, 20, 80, 0, -40, 0, "dark red"); // left forearm
    addCube(rightMember, 20, 20, 80, 0, -40, 0, "dark red"); // right forearm
    addCilinder(leftMember, 5, 80, 15, 10, -32.5, 0, 0, "silver"); // left pipe
    addCilinder(rightMember, 5, 80, -15, 10, -32.5, 0, 0, "silver"); // right pipe
 
    rightMember.position.set(-60, 0, 0);
    leftMember.position.set(60, 0, 0);
    
    chest.add(rightMember, leftMember);
}

function createLegs() {
    'use strict';
    var geometry = new THREE.BoxGeometry(0, 0, 0);
    var material = new THREE.MeshBasicMaterial();
    legs = new THREE.Mesh(geometry, material);
    addCube(legs, 15, 45, 15, 15, -15, 0, "silver"); // left thigh
    addCube(legs, 15, 45, 15, -15, -15, 0, "silver"); // right thigh
    addCube(legs, 27.5, 90, 20, 16.25, -82.5, 0, "dark blue"); // left leg
    addCube(legs, 27.5, 90, 20, -16.25, -82.5, 0, "dark blue"); // right leg
    addCilinder(legs, 17.5, 15, 37.5, -5, 5, Math.PI / 2, 'z', "black"); // left wheel 1
    addCilinder(legs, 17.5, 15, -37.5, -5, 5, Math.PI / 2, 'z', "black"); // right wheel 1
    addCilinder(legs, 17.5, 15, 37.5, -60, 5, Math.PI / 2, 'z', "black"); // left wheel 2
    addCilinder(legs, 17.5, 15, -37.5, -60, 5, Math.PI / 2, 'z', "black"); // right wheel 2
    addCilinder(legs, 17.5, 15, 37.5, -105, 5, Math.PI / 2, 'z', "black"); // left wheel 3
    addCilinder(legs, 17.5, 15, -37.5, -105, 5, Math.PI / 2, 'z', "black"); // right wheel 3 
    
    createFeet(legs);
    legs.position.y = -67.5
    
    chest.add(legs);
}

function createFeet() {
    'use strict';
    var geometry = new THREE.BoxGeometry(0);
    var material = new THREE.MeshBasicMaterial();
    feet = new THREE.Mesh(geometry, material);
    addCube(feet, 27.49, 15, 35, 16.25, 0, 7.5, "blue"); // left foot
    addCube(feet, 27.49, 15, 35, -16.25, 0, 7.5, "blue"); // right foot

    legs.add(feet);
    feet.position.y = -135
}

function addCube(obj, Sx, Sy, Sz, Vx, Vy, Vz, color) {
    'use strict';
    geometry = new THREE.BoxGeometry(Sx, Sy, Sz);
    var material = new THREE.MeshBasicMaterial({ color:colors.get(color), wireframe:false });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Vx, Vy, Vz);
    obj.add(mesh);
}

function addCilinder(obj, r, h, Vx, Vy, Vz, rotation, axis, color) {
    'use strict';
    geometry = new THREE.CylinderGeometry(r, r, h, 32);
    var material = new THREE.MeshBasicMaterial({ color:colors.get(color), wireframe:false });
    mesh = new THREE.Mesh(geometry, material);
    if (rotation !== 0 && axis === 'z') {
        mesh.rotateZ(rotation);
    }
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

    //stats = new Stats()
    //document.body.appendChild(stats.dom)

    createScene();
    createCamera();

    controls = new THREE.OrbitControls(activeCamera, renderer.domElement);

    render();

    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    // TODO use of vectors and speed, not so hardcoded
    for (let [key, value] of animationFlags) {
        if (value) {
            switch (key) {
                case "Q_feet":
                    if (feet.rotation.x < Math.PI/2)
                        feet.rotation.x += Math.PI/16;
                    animationFlags.set(key, false);
                    break;
                case "A_feet":
                    if (feet.rotation.x > 0)
                        feet.rotation.x -= Math.PI/16;
                    animationFlags.set(key, false);
                    break;
                case "W_legs":
                    if (legs.rotation.x < Math.PI/2)
                        legs.rotation.x += Math.PI/16;
                    animationFlags.set(key, false);
                    break;
                case "S_legs":
                    if (legs.rotation.x > 0)
                        legs.rotation.x -= Math.PI/16;
                    animationFlags.set(key, false);
                    break;
                case "E_arms":
                    if (leftMember.position.x - 60 > -20 && rightMember.position.x + 60 < 20) {
                        leftMember.position.x -= 1;
                        rightMember.position.x += 1;
                    }
                    animationFlags.set(key, false);
                    break;
                case "D_arms":
                    if (leftMember.position.x - 60 < 0 && rightMember.position.x + 60 > 0) {
                        leftMember.position.x += 1;
                        rightMember.position.x -= 1;
                    }
                    animationFlags.set(key, false);
                    break;
                case "R_head":
                    if (head.rotation.x > -Math.PI)
                        head.rotation.x -= Math.PI/16;
                    animationFlags.set(key, false);
                    break;
                case "F_head":
                    if (head.rotation.x < 0)
                        head.rotation.x += Math.PI/16;
                    animationFlags.set(key, false);
                    break
            }
        }
    }

    if (wireframeFlag) {
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh)
                node.material.wireframe = !node.material.wireframe;
        });
        wireframeFlag = false;
    }
         
    render();

    controls.update();
    //stats.update();

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
            animationFlags.set("F_head", !animationFlags.get("F_head"));
            break;
        case 82: // R
            animationFlags.set("R_head", !animationFlags.get("R_head"));
            break;
        case 69: // E
            animationFlags.set("E_arms", !animationFlags.get("E_arms"));
            break;
        case 68: // D
            animationFlags.set("D_arms", !animationFlags.get("D_arms"));
            break;
        case 87: // W
            animationFlags.set("W_legs", !animationFlags.get("W_legs"));
            break;
        case 83: // S
            animationFlags.set("S_legs", !animationFlags.get("S_legs"));
            break;
        case 81: // Q
            animationFlags.set("Q_feet", !animationFlags.get("Q_feet"));
            break;
        case 65: // A
            animationFlags.set("A_feet", !animationFlags.get("A_feet"));
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
        case 54: // 6 key (wireframe)
            wireframeFlag = !wireframeFlag;
            break; 
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}