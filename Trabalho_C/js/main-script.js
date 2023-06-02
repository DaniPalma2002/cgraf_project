//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera;
var scene, renderer;
var controls;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F8F8);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    scene.add(camera);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createGround() {
    'use strict';
    const groundGeo = new THREE.PlaneGeometry(500, 500, 500, 500);
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
    createGround();
    
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