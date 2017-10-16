function Balle(args) {
	this.canvas = args.canvas
	this.radius = args.config.radius
	this.speed = args.config.speed

	this.velocity = vec2.fromValues(0, 0);
	this.position = vec2.fromValues(this.canvas.width/2, this.canvas.height/2);
	
	this.moving = false
	this.generateVelocity();
	this.initEvents();
}

Balle.prototype = {
	
	generateVelocity: function() {
		var angle = Math.random()*Math.PI*2
		this.velocity = vec2.fromValues(Math.cos(angle)*this.speed, Math.sin(angle)*this.speed);
	},

	initEvents: function() {

	},

	bounce: function(obstacle) {
		if(obstacle == "wall") this.velocity[1] *= -1	
		if(obstacle == "raquette") this.velocity[0] *= -1
	},

	updatePosition: function() {
		vec2.add(this.position, this.position, this.velocity);
		if(this.position[1] < this.radius/2 || this.position[1] > this.canvas.height - this.radius/2){
			this.bounce('wall')
		}
	},

	draw: function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.position[0], this.position[1]);
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},

	render: function(ctx) {
		this.updatePosition();
		this.draw(ctx);
	}

}