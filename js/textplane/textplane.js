/* Encompasses the classes used to create a Plane with text drawn on it. */
var THREE = require(__base + 'lib/three.min');
var TextTexture = require(__base + 'js/textplane/texttexture');

class TextPlane
{
    constructor(planeWidth, planeHeight, textureWidth, textureHeight, backgroundColor, fontColor, opacity = 0.5)
    {
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;

        this.texture = new TextTexture(textureWidth, textureHeight);
        this.texture.context.font = "10px Lucida Console";
        this.texture.clear(backgroundColor);
        this.fontColor = fontColor;

        var material = new THREE.MeshBasicMaterial(
        {
            map: this.texture.texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity
        });

        var geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        this.mesh = new THREE.Mesh(geometry, material);
    }

    writeText(text)
    {
        var lines = text.split('\n');

        for (var i = 0; i < lines.length; i++)
        {
            this.texture.drawText(lines[i], 0, 10 + i * 11, this.fontColor);
        }
    }
}

module.exports = TextPlane;