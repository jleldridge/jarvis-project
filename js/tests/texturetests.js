require(__base + 'js/OrbitControls');
var THREE = require(__base + 'lib/three.min');
var TextPlane = require(__base + 'js/textplane/textplane');
var TextPlaneLayer = require(__base + 'js/textplane/textplanelayer');
var TextPlaneFactory = require(__base + 'js/textplane/textplanefactory');
var fs = require('fs');

class TextureTests
{
    constructor()
    {
        // renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // camera
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 100;

        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.damping = 0.2;

        // scene
        this.scene = new THREE.Scene();
    }

    simpleLayerTest()
    {
        var layer = new TextPlaneLayer(25);
        for (var i = 0; i < 20; i++)
        {
            var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
            var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
            plane.writeText(msg);
            layer.addPlane(plane);
        }
        layer.arrangePlanes();
        for (var i = 0; i < layer.planes.length; i++)
        {
            this.scene.add(layer.planes[i].mesh);
        }

        var layer2 = new TextPlaneLayer(20);
        for (var i = 0; i < 20; i++)
        {
            var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
            var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
            plane.writeText(msg);
            layer2.addPlane(plane);
        }
        layer2.arrangePlanes();
        for (var i = 0; i < layer2.planes.length; i++)
        {
            this.scene.add(layer2.planes[i].mesh);
        }

        var layer3 = new TextPlaneLayer(12);
        for (var i = 0; i < 20; i++)
        {
            var plane = new TextPlane(5, 5, 512, 512, 'blue', 'orange');
            var msg = "Hello world!\nMy name is Jarvis!\nIt's a pleasure to meet you.";
            plane.writeText(msg);
            layer3.addPlane(plane);
        }
        layer3.arrangePlanes();
        for (var i = 0; i < layer3.planes.length; i++)
        {
            this.scene.add(layer3.planes[i].mesh);
        }

        this.update();
    }
    
    loadCodeFromFilesystemTest(filepaths)
    {
        var layer = new TextPlaneLayer(10);
        
        for (var i = 0; i < filepaths.length; i++)
        {
            var plane = TextPlaneFactory.createTextPlaneFromFile(
                filepaths[i],
                5,
                5,
                512,
                512,
                'blue',
                'orange',
                0.9);
            layer.addPlane(plane);
        }

        layer.arrangePlanes();
        for (var i = 0; i < layer.planes.length; i++)
        {
            this.scene.add(layer.planes[i].mesh);
        }

        this.update();
    }
    
    update()
    {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => { this.update(); });

        // controls.movementSpeed = 0.33 * d;
    }
}

module.exports = TextureTests;