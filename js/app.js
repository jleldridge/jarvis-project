require(__base + 'js/OrbitControls');
var THREE = require(__base + 'lib/three.min');
var TextPlane = require(__base + 'js/textplane/textplane');
var TextPlaneLayer = require(__base + 'js/textplane/textplanelayer');

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 100;

var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// scene
var scene = new THREE.Scene();

var layer = new TextPlaneLayer(25);
for (var i = 0; i < 20; i++){
    var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
    var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
    plane.writeText(msg);
    layer.addPlane(plane);
}
layer.arrangePlanes();
for(var i = 0; i < layer.planes.length; i++){
    scene.add(layer.planes[i].mesh);
}

var layer2 = new TextPlaneLayer(20);
for (var i = 0; i < 20; i++){
    var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
    var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
    plane.writeText(msg);
    layer2.addPlane(plane);
}
layer2.arrangePlanes();
for(var i = 0; i < layer2.planes.length; i++){
    scene.add(layer2.planes[i].mesh);
}

var layer3 = new TextPlaneLayer(12);
for (var i = 0; i < 20; i++){
    var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
    var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
    plane.writeText(msg);
    layer3.addPlane(plane);
}
layer3.arrangePlanes();
for(var i = 0; i < layer3.planes.length; i++){
    scene.add(layer3.planes[i].mesh);
}

var update = function(){
    this.renderer.render(scene, camera);
    window.requestAnimationFrame(update);

    // controls.movementSpeed = 0.33 * d;
};

update();