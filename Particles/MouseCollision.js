function MouseCollision(args) {
	this.config = args.config
	this.obstacles = args.obstacles;
	this.canvas = args.canvas
	this.position = vec2.fromValues(-this.config.radius, -this.config.radius)
	this.initEvent()
}

MouseCollision.prototype = {

	initEvent: function(){
		var self = this;
		this.canvas.addEventListener("mousemove", function(e){
			self.position = vec2.fromValues(e.clientX, e.clientY)

			console.log(self.position)
		})
	},

	changeVelocity: function(el){
		vec2.add(el.position, el.position, this.position)
	},

	avoid: function(){
		var dist;	
		for(i=0; i < this.obstacles.length; i++) {
			dist = vec2.distance(this.obstacles[i].position, this.position);
			if( dist < this.config.radius ) {
				console.log("Avoid")
				this.changeVelocity(this.obstacles[i])
			}
		}
	},

	render: function() {
		this.avoid()
	}
}