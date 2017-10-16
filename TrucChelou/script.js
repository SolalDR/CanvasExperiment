var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
}
var context = canvas.getContext("2d");

function Triangle(args) {
	this.width = args.width ? args.width : 50;
	this.height = args.height ? args.height : 50;
	this.scale = args.scale ? args.scale : [1, 1];
	this.rotate = args.rotate ? args.rotate : 0;
	this.x = args.x;
	this.y = args.y;
	this.stroke = args.stroke;
	this.fill = args.fill;
	this.alpha = args.alpha ? args.alpha : 1;
}

Triangle.prototype = {
	render: function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotate*Math.PI/180)
		ctx.scale(this.scale[0], this.scale[1]);
		ctx.moveTo(-this.width/2, -this.height/2);
		ctx.lineTo(0, this.height/2);
		ctx.lineTo(this.width/2, -this.height/2);
		ctx.closePath();
		ctx.fillStyle = this.fill ? this.fill : "#000";
		ctx.strokeStyle = this.stroke ? this.stroke : "#000";
		ctx.globalAlpha=this.alpha;
		ctx.stroke();
		ctx.restore()
	}
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var l = 100
var r = 720
var scaleMin = 1
var scaleMax = 3

var growthMax = 100
var growth = 100

var animate = true
var sinusoideAnim = 10000
var start = Date.now()

var opacityMin = 0;
var opacityMax = 1;
var opacityInverse = true

var menu = {
	l: document.querySelector("#input-l"),
	r: document.querySelector("#input-r"),
	scaleMin: document.querySelector("#scale-min"),
	scaleMax: document.querySelector("#scale-max"),
	opacity: document.querySelector("#opacity"),
	growthMax: document.querySelector("#growth-max"),
	anim: document.querySelector("#anim-length"),
	activeAnim: document.querySelector("#active-anim"),
	selectFunction: document.querySelector("#selectFunction"),
	opacityInverse: document.querySelector("#opacityInverse")
}

menu.l.addEventListener("input", function(){ l = parseInt(this.value) })
menu.r.addEventListener("input", function(){ r = parseInt(this.value) })
menu.scaleMin.addEventListener("input", function(){ scaleMin = parseInt(this.value) })
menu.scaleMax.addEventListener("input", function(){ scaleMax = parseInt(this.value) })
menu.growthMax.addEventListener("input", function(){ growthMax = parseInt(this.value) })
menu.anim.addEventListener("input", function(){ sinusoideAnim = parseInt(this.value) })
menu.opacity.addEventListener("input", function(){  opacity = parseInt(this.value) / 100 })
menu.opacityInverse.addEventListener("input", function(){ opacityInverse = this.checked ? true : false })
menu.activeAnim.addEventListener("input", function(){
	animate = this.checked ? true : false;
	if( animate ) {
		requestAnimationFrame(draw);
	}
})

//////////////////////////////////////////
//
//				GROWTH
//
//////////////////////////////////////////

var growthChelou1 = function(l, i, param) { return Math.cos(Math.PI*2/l*i)*param }
var growthChelou2 = function(l, i, param) { return Math.sin(Math.PI*2/l*i)*param }

growthAnimX = growthChelou1
growthAnimY = growthChelou2

menu.selectFunction.addEventListener("change", function(){
	switch(this.value) {
		case 'chelou-1' : 
		growthAnimX = growthChelou1;
		growthAnimY = growthChelou2;
		break;
		case 'chelou-2' : 
		growthAnimX = growthChelou1;
		growthAnimY = growthChelou1;
		break;
		case 'chelou-3' : 
		growthAnimX = growthChelou2;
		growthAnimY = growthChelou2;
		break;
		case 'chelou-4' : 
		growthAnimX = growthChelou2;
		growthAnimY = growthChelou1;
		break;
	}
})

function draw() {
	var timestamp = Date.now()
	anim = ((timestamp - start)%sinusoideAnim)/sinusoideAnim

	growth = Math.cos(anim*Math.PI*2)*growthMax 
	context.clearRect(0,0,canvas.width, canvas.height);
	var triangles = [];
	for(var i = 0; i< l; i++ ) {
		triangles.push(new Triangle({
			x: canvas.width/2 + growthAnimX(l, i, growth), //- Math.cos(Math.PI*2/50)*i
			y: canvas.height/2 + growthAnimY(l, i, growth), //- Math.sin(Math.PI*2/50)*i
			rotate: r/l*i,
			scale: [scaleMax-((scaleMax-scaleMin)/l*i), scaleMax-((scaleMax-scaleMin)/l*i)],
			width: l,
			height: l,
			alpha: opacityInverse ?   1.1 - ((opacity)/l*(i+1)) : (opacity/l*(i+1))
		}))
		triangles[i].render(context);
	}
	if( animate ) requestAnimationFrame(draw);
}
requestAnimationFrame(draw);


