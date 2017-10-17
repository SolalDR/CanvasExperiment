var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
	draw();
}
var context = canvas.getContext("2d");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var animate = false
var start = Date.now()
var opacityInverse = true

growthAnimX = function(stepAngle, i, spread) { return Math.cos(stepAngle*i)*spread }
growthAnimY = function(stepAngle, i, spread) { return Math.sin(stepAngle*i)*spread }

var draw = function() {
	context.clearRect(0,0,canvas.width, canvas.height);
	var triangles = [];
	var stepScaleFactor = (store.scale.max-store.scale.min)/store.polygons.val; 
	var stepAngle = Math.PI*2/store.polygons.val;

	for(var i = 0; i< store.polygons.val; i++ ) {
		triangles.push(new Polygon({
			nbPoints: store.ridge.val,
			
			x: canvas.width/2 + growthAnimX(stepAngle, i, store.spread.val), //- Math.cos(Math.PI*2/50)*i
			y: canvas.height/2 + growthAnimY(stepAngle, i, store.spread.val), //- Math.sin(Math.PI*2/50)*i
			
			rotate: store.rotate.val/store.polygons.val*i,
			scale: [
				store.scale.max-(stepScaleFactor*i), 
				store.scale.max-(stepScaleFactor*i)
			],
			size: store.polygons.val,
			alpha: opacityInverse ?   1.1 - ((store.opacity.val)/store.polygons.val*(i+1)) : (store.opacity.val/store.polygons.val*(i+1))
		
		}))
		triangles[i].render(context);
	}
	if( animate ) requestAnimationFrame(draw);
}

// requestAnimationFrame(draw);
draw();
var control = new GlobalControl("#global-control", store, draw);

