function Particle(args) {
	this.ctx = args.ctx
	this.speed = args.config.speed;
	this.radius = args.config.radius;
	this.canvas = args.canvas
	this.generatePosition();
	this.generateVelocity();
}

Particle.prototype = {

	generatePosition: function(){
		this.position = vec2.fromValues(Math.floor(this.canvas.width*Math.random()), Math.floor(this.canvas.height*Math.random()));
	},

	generateVelocity: function() {
		var angle = Math.random()*Math.PI*2
		var speed = Math.random()*(this.speed.max - this.speed.min) + this.speed.min;
		this.velocity = vec2.fromValues(Math.cos(angle)*speed, Math.sin(angle)*speed);
	},

	bounce: function(obstacle) {
		if(obstacle == "y") this.velocity[1] *= -1	
		if(obstacle == "x") this.velocity[0] *= -1
	},

	updatePosition: function() {
		vec2.add(this.position, this.position, this.velocity);
		if(this.position[1] < this.radius/2 || this.position[1] > this.canvas.height - this.radius/2){
			this.bounce('y');
		} else if(this.position[0] < this.radius/2 || this.position[0] > this.canvas.width - this.radius/2) {
			this.bounce("x");
		}
	},

	draw: function() {
		var ctx = this.ctx
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.position[0], this.position[1]);
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},

	render: function() {
		this.updatePosition();
		this.draw();
	}
}