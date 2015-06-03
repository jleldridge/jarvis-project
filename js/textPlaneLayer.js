var TextPlane = TextPlane || {};

/* Encompasses classes used to draw planes around an imaginary sphere. */

TextPlane.Layer = function (radius){
    this.radius = radius;
    this.planes = new Array();
};

TextPlane.Layer.prototype.addPlane = function(plane){
    this.planes.push(plane);
};

TextPlane.Layer.prototype.arrangePlanes = function(){
    var pos = 0;
    var rotationIncrement = 2*Math.PI / this.planes.length;
    var currRotation = 0;

    for (var i = 0; i < this.planes.length; i++){
        var p = this.planes[i];
        currRotation += rotationIncrement;
        p.mesh.rotation.y = currRotation;
        p.mesh.position.x = this.radius * Math.sin(p.mesh.rotation.y);
        p.mesh.position.z = this.radius * Math.cos(p.mesh.rotation.y);
    }
};
