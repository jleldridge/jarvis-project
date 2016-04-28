var TextPlane = require(__base + 'js/textplane/textplane');
var fs = require('fs');

class TextPlaneFactory
{
    /**
     * @param {string} path the path to the file
     * @return {TextPlane} a textplane object with the file contents rendered onto it.
     */
    static createTextPlaneFromFile(
        path,
        planeWidth,
        planeHeight,
        textureWidth,
        textureHeight,
        backgroundColor,
        fontColor,
        opacity = 0.5)
    {
        var text = fs.readFileSync(path, 'UTF8');
        var plane = new TextPlane(
            planeWidth,
            planeHeight,
            textureWidth,
            textureHeight,
            backgroundColor,
            fontColor,
            opacity);
        plane.writeText(text);

        return plane;
    }
}

module.exports = TextPlaneFactory;