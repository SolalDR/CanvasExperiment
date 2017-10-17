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

MaterialEase = {
	duration: 1000,
	size: 300, 
	itemPerRow: 4,
	calcCoord: function(i, length){
		var xFactor = i%this.itemPerRow;
		var yFactor = Math.floor(i/this.itemPerRow);
		return [xFactor*this.size, yFactor*this.size]
	},
	clickCanvas: function(event){
		
		var y = Math.floor(event.layerY/this.size)
		var x = Math.floor(event.layerX/this.size)
		var r = y*this.itemPerRow + x; 

		if( this.currentEaser ){
			this.currentEaser.clean();
			this.currentEaser.drawBg();
		}
		

		this.currentEaser = this.easers[r];
		this.currentEaser.start();

		this.last = Date.now();
		this.start = this.last
		this.currentTime = 0;
		this.drawEaser()
	},

	drawEaser: function(){
		this.rafId = requestAnimationFrame(this.drawEaser.bind(this))
		var now = Date.now()
		var dt = now - this.last
		this.last = now
		this.currentTime += dt; 
		this.draw();
		if( this.currentTime > this.duration ) {
			cancelAnimationFrame(this.rafId)
		}
	},	

	draw: function(){
		ctx.save();
		ctx.beginPath();
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for(i=0; i< this.easers.length; i++) {
			var coord = this.calcCoord(i, this.easers.length);
			ctx.drawImage(this.easers[i].screenBg, coord[0], coord[1], this.size, this.size ); 
		}
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},
	initSize: function(count) {
		canvas.width = this.itemPerRow * this.size
		canvas.height = Math.round(count/this.itemPerRow)*this.size;
	},
	createEaser: function(timingFunction, rank){
		this.easers.push(new Easer({
			timingFunction: timingFunction,
			size: this.size,
			duration: this.duration
		}))
	},
	initEvents: function(){
		var self = this;
		canvas.addEventListener("click", function(e){
			console.log(e)
			self.clickCanvas(e)
		})
	},
	init: function(){
		
		var count = 0;
		this.easers = [];
		this.createEaser(Easing["easeInSine"], 0);
		for(Ease in Easing) {
			this.createEaser(Easing[Ease], count);
			count++
		}
		this.initSize(count);
		MaterialEase.draw();
		this.initEvents();
	}
}


MaterialEase.init();

function render() {
	// MaterialEase.render();
	// requestAnimationFrame(render);
}

// requestAnimationFrame(render);


