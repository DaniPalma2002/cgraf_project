//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, camera, renderer;
var fieldTexture, skyTexture;
var groundTexture = false;
var skyTexture = false;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    'use strict';

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////


////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createTextures() {
    'use strict';

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });

    if (groundTexture) {

        var colors = [0xffffff, 0xffff00, 0x9370db, 0xadd8e6]; 
        var fieldRadius = 8;
        var fieldDensity = 1000;
        var positions = [];
        var colorsData = [];

        for (var i = 0; i < fieldDensity; i++) {
            var x = Math.random() * fieldRadius * 3 - fieldRadius;
            var y = Math.random() * fieldRadius * 3 - fieldRadius;
            var z = 0;

            positions.push(x, y, z);

            var color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
            colorsData.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsData, 3));

        scene.background = new THREE.Color(0x17ad00); 
    } else if (skyTexture) {

        var skyRadius = 8;
        var skyDensity = 1000;
        var positions = [];
        var colorsData = [];

        for (var i = 0; i < skyDensity; i++) {
            var x = Math.random() * skyRadius * 3 - skyRadius;
            var y = Math.random() * skyRadius * 3 - skyRadius;
            var z = 0;

            positions.push(x, y, z);

            var color = new THREE.Color(0xffffff); 
            colorsData.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsData, 3));

        var gradientTexture = new THREE.Texture(generateGradientCanvas());
        gradientTexture.needsUpdate = true;
        scene.background = gradientTexture;
    }

    var points = new THREE.Points(geometry, material);
    scene.add(points);
}

function generateGradientCanvas() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 256;
    canvas.height = 256;

    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#00008B'); 
    gradient.addColorStop(1, '#8A2BE2'); 

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}

function saveTexture(name) {
    let element = document.createElement("a");
    document.body.appendChild(element);
    element.download = name + ".jpeg";
    element.href = renderer.domElement.toDataURL("image/jpeg");
    element.click();
    document.body.removeChild(element);
}

////////////
/* UPDATE */
////////////
function update() {
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

    createScene();
    createCamera();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    animate();
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    requestAnimationFrame(animate);

    update();
    render();
    if (groundTexture) {
        saveTexture("Ground");
        groundTexture = false;
    } else if (skyTexture) {
        saveTexture("Sky");
        skyTexture = false;
    }
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
    'use strict';

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: // Arrow Left
            groundTexture = true;
            skyTexture = false;
            scene.remove(scene.children[0]);
            createTextures();
            break;
        case 50: // Arrow Up
            skyTexture = true;
            groundTexture = false;
            scene.remove(scene.children[0]);
            createTextures();
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e) {
    'use strict';
}
