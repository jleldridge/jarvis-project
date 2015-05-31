var TextPlane = TextPlane || {};

/* Encompasses classes used to draw planes around an imaginary sphere. */

TextPlane.Layer = function (radius){
    this.radius = radius;
    this.planes = new Array();
};

TextPlane.Layer.prototype.addPlane = function(plane){
    this.planes.push(plane);


    var pos = 0;
    for (var i = 0; i < this.planes.length; i++){
        var p = this.planes[i];
        p.mesh.position.x = pos;
        p.mesh.position.y = 0;
        p.mesh.rotation.y = Math.asin(p.mesh.position.x / this.radius);
        p.mesh.position.z = this.radius * Math.cos(p.mesh.rotation.y);
        pos += p.planeWidth;
    }
};
