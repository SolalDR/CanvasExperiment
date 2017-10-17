
function Polygon(args) {
  this.nbPoints = args.nbPoints;
  this.size = args.size;
  this.scale = args.scale ? args.scale : [1, 1];
  this.rotate = args.rotate ? args.rotate : 0;
  this.x = args.x;
  this.y = args.y;
  this.stroke = args.stroke;
  this.fill = args.fill;
  this.alpha = args.alpha ? args.alpha : 1;
}

Polygon.prototype = {
  getCoords: function(){
    angle = Math.PI*2/this.nbPoints; 
    var coords = [];
    for(var i=0; i<this.nbPoints; i++){
      coords.push([Math.cos(angle*i)*this.size, Math.sin(angle*i)*this.size])
    }
    return coords; 
  },
  render: function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate*Math.PI/180)
    ctx.scale(this.scale[0], this.scale[1]);

    var coords = this.getCoords();
    ctx.moveTo(coords[0][0], coords[0][1]);
    for(i=0; i< coords.length; i++){
      ctx.lineTo(coords[i][0], coords[i][1]);
    }
    
    ctx.closePath();
    ctx.fillStyle = this.fill ? this.fill : "#000";
    ctx.strokeStyle = this.stroke ? this.stroke : "#000";
    ctx.globalAlpha=this.alpha;
    ctx.stroke();
    ctx.restore()
  }
}
