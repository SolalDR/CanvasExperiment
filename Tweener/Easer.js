function Easer(args) {
	this.pointsBackground = []
	this.precision = 300
	this.duration = args.duration
	this.size = args.size ? args.size : 300
	this.timingFunction = args.timingFunction
	this.generateCanvas();
	this.generateBackground();
	this.drawBg();
}

Easer.prototype = {

	generateBackground: function(){
		var points = []
		for(var i = 0; i < this.precision ; i++) {
			points.push([i/this.precision, this.timingFunction(i, 0, 1, this.precision)])
		}
		this.pointsBg = points
	},

	generateCanvas: function(){
		this.screenBg = document.createElement("canvas");
		this.screenBg.width = this.size;
		this.screenBg.height = this.size;
		this.screenCtx = this.screenBg.getContext("2d");
	},	

	drawBg: function(){
		var ctx = this.screenCtx
		ctx.save();
		ctx.beginPath();
		ctx.strokeRect(0, 0, this.size, this.size)
		ctx.moveTo(0, 0);
		ctx.globalAlpha = 0.4
		for(i=0; i<this.pointsBg.length; i++) {
   			ctx.lineTo(this.pointsBg[i][0]*this.size, this.pointsBg[i][1]*this.size);
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	},

	start: function(){
		this.position = [0, 0];
		this.startTime = Date.now();
		this.currentTime = 0; 
		this.lastUpdate = this.startTime 

		var ctx = this.screenCtx
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#DDD"
		ctx.fillRect(0, 0, this.size, this.size)
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		this.drawBg();
		this.tween();

	},

	clean: function(){
		this.screenCtx.clearRect(0, 0, this.size, this.size)
	},

	addPoint: function(){
		var ctx = this.screenCtx
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, 0)
		ctx.fillStyle = "#000"
		ctx.globalAlpha = 1
		ctx.fillRect(this.position[0]*this.size-2, this.position[1]*this.size-2, 4, 4)
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},

	tween: function() {
		this.rafId = requestAnimationFrame(this.tween.bind(this))
		
		var ctx = this.screenCtx

		now = Date.now()
		dt = now - this.lastUpdate
		this.lastUpdate = now

		this.currentTime += dt

		if (this.currentTime < this.duration) {
			this.position[0] = this.currentTime/this.duration
			this.position[1] = this.timingFunction(this.currentTime, 0, 1, this.duration)
			this.addPoint();
		} else {
			cancelAnimationFrame(this.rafId)
		}
	}
}