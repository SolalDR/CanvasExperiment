function Raquette(args){
	this.canvas = args.canvas
	this.side = args.side
	this.width = args.config.width
	this.height = args.config.height
	this.speed = args.config.speed
	this.velocity = vec2.fromValues(0, 0);
	this.control = args.control
	this.moving = false
	this.decal = args.config.decal
	var x = (this.side === 'left') ? this.decal : canvas.width-this.width - this.decal
	this.position = vec2.fromValues(x, args.top);
	this.collapsers = [];
	this.initEvents();
}

Raquette.prototype = {

	initEvents: function(){
		var self = this;
		window.addEventListener("keydown", function(e){
			if(e.keyCode == self.control.up) {
				self.moving = true
				self.direction = "down"
			} else if(e.keyCode == self.control.down) {
				self.moving = true
				self.direction = "up"
			}
		})
		window.addEventListener("keyup", function(e){
			if(e.keyCode === self.control.up || e.keyCode === self.control.down) {
				self.moving = false
			}
		})
	},

	addCollapser: function(object) {
		this.collapsers.push(object)
	},

	testCollision: function(collapser) {
		var hasCollision = false
		if(collapser.position[1] > this.position[1] && collapser.position[1] < this.position[1]+this.height) {
			if(Math.abs(collapser.position[0] - this.position[0]) < collapser.radius/2) {
				collapser.bounce('raquette')
			} 
		}
	},

	updateCollisions: function(){
		for(var i=0; i<this.collapsers.length; i++) {
			this.testCollision(this.collapsers[i]);
		}
	},

	set direction(dir) {
		if(this.direction !== dir) {
			this._direction = dir
			this.velocity = (dir == "up") ? vec2.fromValues(0, -1*this.speed) : vec2.fromValues(0, this.speed)
		}
	},

	get direction(){
		return this._direction;
	},

	updatePosition: function() {
		if( this.moving ) {
			vec2.add(this.position, this.position, this.velocity)
			if(this.position[1] < 0) {
				vec2.set(this.position, this.position[0], 0) 
				this.moving = false
			} else if (this.position[1] > this.canvas.height - this.height) {
				vec2.set(this.position, this.position[0], this.canvas.height - this.height) 
				this.moving = false
			}
		}
	},

	draw: function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.position[0], this.position[1]);
		ctx.rotate(this.rotate*Math.PI/180)
		ctx.fillRect(0, 0, this.width, this.height); 
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
		ctx.restore()
	},

	render: function(ctx) {
		this.updatePosition();
		this.updateCollisions();
		this.draw(ctx)
	}
}