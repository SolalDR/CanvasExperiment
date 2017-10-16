var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var config = {
	particles: {
		speed: {
			min: 1, 
			max: 2
		},
		radius: 2,
		nbParticul: 200
	},
	intersecter: {
		distance: 200
	},
	mouse: {
		radius: 300
	}
}


Particles = {
	particles: [],
	render: function(){
		for(i=0; i<this.particles.length; i++) {
			this.particles[i].render();
		}
		this.intersecter.render();
		// this.mouseCollision.render();
	},
	init: function(){
		for(var i = 0; i < config.particles.nbParticul; i++) {
			this.particles.push(new Particle({
				ctx: context, 
				canvas: canvas,
				config: config.particles
			}));
		}
		this.intersecter = new Intersecter({
			particles: this.particles, 
			config: config.intersecter,
			ctx: context, 
			canvas: canvas
		})
		// this.mouseCollision = new MouseCollision({
		// 	canvas: canvas,
		// 	config: config.mouse,
		// 	obstacles: this.particles
		// });
	}
}

var context = canvas.getContext("2d");




Particles.init();

function render() {
	context.clearRect(0,0, canvas.width, canvas.height)
	Particles.render();
	requestAnimationFrame(render);
}

requestAnimationFrame(render);


