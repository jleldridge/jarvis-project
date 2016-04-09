/* Encompasses the classes used to create a Plane with text drawn on it. */

TextPlane.Plane = class Plane
{
    constructor(planeWidth, planeHeight, textureWidth, textureHeight, backgroundColor, fontColor)
    {
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;

        this.texture = new TextPlane.Texture(textureWidth, textureHeight);
        this.texture.context.font = "10px Lucida Console";
        this.texture.clear(backgroundColor);
        this.fontColor = fontColor;

        var material = new THREE.MeshBasicMaterial(
        {
            map: this.texture.texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
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
};