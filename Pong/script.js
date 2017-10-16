var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var context = canvas.getContext("2d");
var config = {
	raquette : {
		height: 100,
		width: 10,
		speed: 10,
		decal: 50
	},
	balle: {
		radius: 10,
		speed: 15
	}
}

// var player1 = new Raquette({
// 	canvas: canvas,
// 	top: canvas.height/2,
// 	side: "left",
// 	config: config.raquette,
// 	control: {
// 		up: 83,
// 		down: 90
// 	}
// });
// var player2 = new Raquette({
// 	canvas: canvas,
// 	top: canvas.height/2,
// 	side: "right",
// 	config: config.raquette,
// 	control: {
// 		up: 40,
// 		down: 38
// 	}
// });


var game = new Game({
	canvas: canvas, 
	config: config, 
	ctx: context
});

game.addPlayer({
	side: 'left', 
	control: { up: 83, down: 90 }
})

game.addPlayer({
	side: 'right', 
	control: { up: 40, down: 38 }
})


function render() {
	var timestamp = Date.now()
	context.clearRect(0,0, canvas.width, canvas.height)
	game.render();
	// player1.render(context);
	// player2.render(context);
	// balle.render(context);
	requestAnimationFrame(render);
}

requestAnimationFrame(render);


