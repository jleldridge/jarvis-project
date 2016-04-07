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
  var rows = this.generateRows();

  for (var i = 0; i < rows.length; i++){
    var rotationIncrement = 2*Math.PI / rows[i].length;
    var currRotation = 0;

    for (var j = 0; j < rows[i].length; j++){
      var p = rows[i][j];
      p.mesh.rotation.y = currRotation;
      p.mesh.position.x = this.radius * Math.sin(p.mesh.rotation.y);
      p.mesh.position.z = this.radius * Math.cos(p.mesh.rotation.y);
      p.mesh.position.y = i * 6;

      currRotation += rotationIncrement;
    }
  }
};

TextPlane.Layer.prototype.generateRows = function(){
  var circumference = 2 * Math.PI * this.radius;
  var rowCircumferenceSum = 0;

  var rows = [];
  var currRow = 0;
  var planeIndex;
  rows[currRow] = [];
  // arrange planes into rows
  for (planeIndex = 0; planeIndex < this.planes.length; planeIndex++){
    var p = this.planes[planeIndex];
    rowCircumferenceSum += p.planeWidth;

    if (rowCircumferenceSum > circumference){
      planeIndex -= 1;
      currRow += 1;
      rows[currRow] = [];
      rowCircumferenceSum = 0;
    }
    else{
      rows[currRow].push(p);
    }
  }

  return rows;
};
