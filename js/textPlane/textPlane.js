var TextPlane = TextPlane || {};

/* Encompasses the classes used to create a Plane with text drawn on it. */

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
TextPlane.Texture = class Texture
{
  constructor(width, height){
    var canvas = document.createElement('canvas');
    canvas.width = width;
  	canvas.height = height;
  	this.canvas	= canvas;

  	var context	= canvas.getContext('2d');
  	this.context = context

  	var texture	= new THREE.Texture(canvas);
  	this.texture = texture;
  }

  /**
   * clear the canvas
   *
   * @param  {String*} fillStyle 		the fillStyle to clear with, if not provided, fallback on .clearRect
   * @return {THREEx.DynamicTexture}      the object itself, for chained texture
   */
  clear(fillStyle)
  {
    // depends on fillStyle
  	if( fillStyle !== undefined ){
  		this.context.fillStyle	= fillStyle;
  		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
  	}
    else
    {
  		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  	}
  	// make the texture as .needsUpdate
  	this.texture.needsUpdate = true;
  	// for chained API
  	return this;
  }

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
  drawText(text, x, y, fillStyle, font)
  {
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
  }

  /**
   * execute the drawImage on the internal context
   * the arguments are the same the official context2d.drawImage
   */
  drawImage()
  {
    // call the drawImage
    this.context.drawImage.apply(this.context, arguments);
    // make the texture as .needsUpdate
    this.texture.needsUpdate = true;
    // for chained API
    return this;
  }
}


////////////////////////////////////////////////////////////////////////////////
//                          Plane Class                                       //
////////////////////////////////////////////////////////////////////////////////
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

    var material = new THREE.MeshBasicMaterial({
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

    for (var i = 0; i < lines.length; i++){
        this.texture.drawText(lines[i], 0, 10 + i * 11, this.fontColor);
    }
  }
}