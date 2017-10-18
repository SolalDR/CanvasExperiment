var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var ctx = canvas.getContext("2d");

BlobPoint = function(args) {
	this.noise = args.noise;
	this.noiseRank = args.noiseRank
	this.rank = args.rank;
	this.angle = args.angle; 
	this.radiusBase = args.radius;
	this.radius = this.radiusBase;
	this.amplitude = args.amplitude; 
	this.calcCoords();	
}

var noise = new SimplexNoise();


BlobPoint.prototype = {
	update: function(anim){
		// console.log(index)
		this.value2d = this.noise.noise3D(this.coordsSimple.x, this.coordsSimple.y, anim);
		this.updateRadius();
	},
	updateRadius: function(){
		this.radius = this.value2d*this.amplitude + this.radiusBase;
		this.calcCoords();
	},
	genNoisedCoord: function(){

	},
	calcCoords: function(){
		this.coordsSimple = {
			x: Math.cos(this.angle),
			y: Math.sin(this.angle)
		}
		this.coords = {
			x: Math.cos(this.angle) * this.radius,
			y: Math.sin(this.angle) * this.radius
		}
	}
}

function Blob(args) {
	this.pointable = args.point ? true : false; 
	this.lineBetween = args.lineBetween ? args.lineBetween : false
	this.nbPoints = args.nbPoints; 
	this.amplitude = args.ampli;
	this.radius = args.radius;
	this.ctx = ctx;
	this.canvas = canvas;
	this.points = [];
	this.noise = new SimplexNoise();
	this.rank = Math.floor(Math.random()*100);
	this.trace = args.trace ? args.trace : 1;
	this.colored = args.colored ? args.colored : false
	this.coords = {
		x: canvas.width/2,
		y: canvas.height/2
	};
	
	this.genPoints();
	this.draw();
}

Blob.prototype = {

	genPoints: function(){
		var step = Math.PI*2/this.nbPoints; 
		for(var i = 0; i < this.nbPoints; i++) {
			this.points.push(new BlobPoint({
				angle: step*i, 
				radius: this.radius,
				noise: this.noise,
				rank: i,
				noiseRank: this.rank,
				amplitude: this.amplitude
			}))
		}
	},

	updatePoints: function(anim){
		for(i=0; i<this.points.length; i++) {
			this.points[i].update(anim)
		}
	},

	draw: function(anim){
		var ctx = this.ctx
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, 0)
		ctx.fillStyle = 'rgba(0, 0, 0, '+ this.trace +')';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.fill();
		ctx.beginPath();
		if(this.colored) {
			ctx.strokeStyle = "rgb("+[
				Math.min(255, Math.floor(this.noise.noise2D(anim, anim)*128)+128),
				Math.min(255, Math.floor(this.noise.noise2D(anim, anim+2)*128)+128),
				Math.min(255, Math.floor(this.noise.noise2D(anim, anim+4)*128)+128)
			].join(',')+")"
		} else {
			ctx.strokeStyle = '#FFF'
		}
		
		if(this.lineBetween) {
			for(var i = 0; i < this.points.length; i++) {
				for(var j=0; j< this.points.length; j++) {
					ctx.moveTo(this.coords.x + this.points[i].coords.x, this.coords.y + this.points[i].coords.y)
					ctx.lineTo(this.coords.x + this.points[j].coords.x, this.coords.y + this.points[j].coords.y)	
				}
			}
		} else {
			for(var i = 0; i < this.points.length; i++) {
				ctx.lineTo(this.coords.x + this.points[i].coords.x, this.coords.y + this.points[i].coords.y)	
			}
		}
		
		ctx.lineTo(this.coords.x + this.points[0].coords.x, this.coords.y + this.points[0].coords.y)
		ctx.stroke();

		ctx.closePath();
		ctx.restore();

	},
	tween: function() {
		this.rafId = requestAnimationFrame(this.tween.bind(this))
		var anim = Date.now()/3000;
		this.updatePoints(anim);
		this.draw(anim);
	}
}

blob = new Blob({
	nbPoints: 200,
	ampli: 20, 
	radius: 200,
	noise: noise,
	point: true,
	lineBetween: false,
	trace: 0.05,
	colored: true
});

blob.tween();
