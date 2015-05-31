var TextPlane = TextPlane || {};

////////////////////////////////////////////////////////////////////////////////
//                          Texture Class                                     //
////////////////////////////////////////////////////////////////////////////////

/* Texture code adapted or copied from https://github.com/jeromeetienne/threex.dynamictexture */

/**
 * create a dynamic texture with a underlying canvas
 *
 * @param {Number} width  width of the canvas
 * @param {Number} height height of the canvas
 */
TextPlane.Texture = function(width, height){
    var canvas = document.createElement('canvas');
    canvas.width = width;
	canvas.height = height;
	this.canvas	= canvas;

	var context	= canvas.getContext('2d');
	this.context = context

	var texture	= new THREE.Texture(canvas);
	this.texture = texture;
};

/**
 * clear the canvas
 *
 * @param  {String*} fillStyle 		the fillStyle to clear with, if not provided, fallback on .clearRect
 * @return {THREEx.DynamicTexture}      the object itself, for chained texture
 */
TextPlane.Texture.prototype.clear = function(fillStyle){
	// depends on fillStyle
	if( fillStyle !== undefined ){
		this.context.fillStyle	= fillStyle;
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
	}else{
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}
	// make the texture as .needsUpdate
	this.texture.needsUpdate = true;
	// for chained API
	return this;
};

/**
 * draw text
 *
 * @param  {String}		text	the text to display
 * @param  {Number|undefined}	x	if provided, it is the x where to draw, if not, the text is centered
 * @param  {Number}		y	the y where to draw the text
 * @param  {String*} 		fillStyle the fillStyle to clear with, if not provided, fallback on .clearRect
 * @param  {String*} 		contextFont the font to use
 * @return {THREEx.DynamicTexture}	the object itself, for chained texture
 */
TextPlane.Texture.prototype.drawText = function(text, x, y, fillStyle, font){
    // set font if needed
	if(font !== undefined)	this.context.font = font;
	// if x isnt provided
	if(x === undefined || x === null){
		var textSize = this.context.measureText(text);
		x = (this.canvas.width - textSize.width) / 2;
	}
	// actually draw the text
	this.context.fillStyle = fillStyle;
	this.context.fillText(text, x, y);
	// make the texture as .needsUpdate
	this.texture.needsUpdate = true;
	// for chained API
	return this;
};

/**
 * execute the drawImage on the internal context
 * the arguments are the same the official context2d.drawImage
 */
TextPlane.Texture.prototype.drawImage = function (/* same params as context2d.drawImage */){
    // call the drawImage
    this.context.drawImage.apply(this.context, arguments);
    // make the texture as .needsUpdate
    this.texture.needsUpdate = true;
    // for chained API
    return this;
};

////////////////////////////////////////////////////////////////////////////////
//                          Plane Class                                       //
////////////////////////////////////////////////////////////////////////////////

TextPlane.Plane = function(planeWidth, planeHeight, textureWidth, textureHeight, text, color, backgroundColor){
    var texture = new TextPlane.Texture(textureWidth, textureHeight);
    texture.context.font = "20px Verdana";
    texture.clear(backgroundColor).drawText(text, 0, 30, color);

    var material = new THREE.MeshBasicMaterial({
        map: texture.texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });

    var geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    this.mesh = new THREE.Mesh(geometry, material);
};
