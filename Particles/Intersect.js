function Intersecter(args) {
	this.particles = args.particles; 
	this.config = args.config;
	this.ctx = args.ctx
	this.canvas = args.canvas
	this.shapes = []
}

Intersecter.prototype = {
	testDistance: function(a, b){
		var dist = vec2.dist(a.position, b.position);
		if( dist < this.config.distance ) {
			this.shapes.push([a.position, b.position, dist]); 
		} 
	},

	renderIntersection: function(){
		this.shapes = []
		var particule;
		var length = this.particles.length;
		for(i=0; i<length; i++) {
			particule = this.particles[i];
			for(var j=0; j<length; j++) {
				if(i !== j) {
					this.testDistance(particule, this.particles[j]);
				}
			}
		}
		this.draw();
	},

	draw: function() {
		var ctx = this.ctx
		ctx.save();
		for(var i = 0; i<this.shapes.length; i++) {
			ctx.globalAlpha = 1 - (this.shapes[i][2]/this.config.distance);
			ctx.beginPath();
			ctx.moveTo(this.shapes[i][0][0], this.shapes[i][0][1]);
			ctx.lineTo(this.shapes[i][1][0], this.shapes[i][1][1]);
			ctx.lineWidth = 1
			ctx.stroke();
			ctx.closePath();	
		}
		ctx.restore();
	},

	render: function() {
		this.renderIntersection();
	}
}