var circleImage = document.getElementById("sourceCircle");

function Polygon(args) {
  this.nbPoints = args.nbPoints;
  this.size = args.size;
  this.scale = args.scale ? args.scale : 1;
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

  renderLine: function(ctx, coords){
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
  },

  renderPoint: function(ctx, coords) {
    var coords = this.getCoords();
    for(i=0; i< coords.length; i++){
      ctx.moveTo(coords[i][0], coords[i][1]);
      ctx.arc(coords[i][0], coords[i][1], 2,0,2*Math.PI);
    }
    ctx.closePath();
    ctx.fillStyle = this.fill ? this.fill : "#000";
    ctx.strokeStyle = this.stroke ? this.stroke : "#000";
    ctx.globalAlpha=this.alpha;
    ctx.stroke();
    ctx.restore()
  },

  renderPointLine: function(ctx, coords){
    var coords = this.getCoords();
    
    ctx.moveTo(coords[0][0], coords[0][1]);
    for(i=0; i< coords.length; i++){
      ctx.lineTo(coords[i][0], coords[i][1]);
    }
    ctx.closePath();
    if(store.drawType.val === POINT_LINE_DRAW) ctx.globalAlpha = drawAnim * this.alpha;
    if(store.drawType.val === LINE_POINT_DRAW) ctx.globalAlpha = (1 - drawAnim) * this.alpha;

    ctx.stroke();
    
    if(store.drawType.val === POINT_LINE_DRAW) ctx.globalAlpha= (1 - drawAnim) * this.alpha;
    if(store.drawType.val === LINE_POINT_DRAW) ctx.globalAlpha= drawAnim * this.alpha;
    
    for(i=0; i< coords.length; i++){
      ctx.drawImage(circleImage, coords[i][0] - 2, coords[i][1] - 2, 4, 4)
    }
    ctx.restore();
  },

  render: function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate*Math.PI/180)
    ctx.scale(this.scale, this.scale);
    var coords = this.getCoords();
    switch (store.drawType.val) {
      case LINE_DRAW: this.renderLine(ctx, coords); break;
      case POINT_DRAW: this.renderPoint(ctx, coords); break;
      case LINE_POINT_DRAW: this.renderPointLine(ctx, coords); break;
      case POINT_LINE_DRAW: this.renderPointLine(ctx, coords); break;
    }
  }
}
