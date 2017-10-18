/////////////////////////////////////////
//	
//			INITIALISATION
//
/////////////////////////////////////////

var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
	draw();
}


/////////////////////////////////////////
//
//			FUNCTIONS
//
/////////////////////////////////////////


function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

// Create ann triangles
function draw(nbTriangles){
	context.clearRect(0,0,canvas.width, canvas.height);
	for(var i = 0; i< nbTriangles; i++ ) {
		triangles.push(new Polygon({
			// Number of points per polygon
			nbPoints: store.side.val, 									

			// Each coord are shift more and more of the center thanks to spread
			x: canvas.width/2 + growthAnimX(stepAngle, i, spreadAnim.x),	 
			y: canvas.height/2 + growthAnimX(stepAngle, i, spreadAnim.y), 

			// Each polygon is rotate & scale more and more in function of his rank.   
			rotate: rotateAnim/store.polygons.val*i + anim*3, // anim*3 create a global rotation of the scene
			scale: store.scale.max-(stepScaleFactor*i),		
			size:  store.polygons.val + average*2,
			alpha: opacityAnim/nbTriangles*(i+1)
		}))

		// Display the polygon
		triangles[i].render(context);
	}
} 

function manageFullScreen() {
	var btn = document.querySelector("#button-fullscreen");
	btn.addEventListener("click", function(){
		toggleFullScreen()
	}, false)
}

// Generate the next number of side of the polygon
function genRandomSide(){
	valueGen = Math.random() > 0.7 ? 1 : -1; 
	if(valueGen == -1 && store.side.val == 3) valueGen *= -1;
	store.side.val += valueGen;
	return store.side.val
}

function genSpreadTarget(){
	spreadTarget = {
		x: Math.random()*400 - 200,
		y: Math.random()*400 - 200
	}
}

function approachSpreadCoord(){
	spreadAnim = {
		x: spreadAnim.x + (spreadTarget.x - spreadAnim.x) * 0.01,
		y: spreadAnim.y + (spreadTarget.y - spreadAnim.y) * 0.01
	}
}

/////////////////////////////////////////
//				Audio	
/////////////////////////////////////////

var analyser = new SoundAnalyser('./Pont_des_arts.mp3', {})
analyser.addKick(70, 'basse');

/////////////////////////////////////////
//			FUNCTIONS
/////////////////////////////////////////

growthAnimX = function(stepAngle, i, spread) { return Math.cos(stepAngle*i)*spread }

var lastTime = Date.now(), timeleft = 0;
var now; 
var spreadTarget, spreadAnim = {x: 0, y: 0};
var anim = 0; // Rotation global, incrémenter avec le temps
var rotateAnim = 0;
var opacityAnim = 0;
var max = 100;	// Limit of average
var triangles = [], stepScaleFactor, stepAngle, average;
var hasKicked = false, kickTime = 0;
var spreadTarget;
var eases = [0.1, 0.05] // Ease

var render = function() {
	// Time manage
	now = Date.now();
	timeleft = now - lastTime
	lastTime = now
	anim += 0.1

	// Animation
	opacityAnim = (Math.cos(anim/10) + 1)/4 + 0.5
	rotateAnim = Math.cos(anim/20)*store.rotate.val;
	
	// ease approach of spreadTarget 
	if(spreadTarget) approachSpreadCoord();

	stepScaleFactor = (store.scale.max-store.scale.min)/store.polygons.val; 
	stepAngle = Math.PI*2/store.polygons.val;

	// Kick match
	kickTime += timeleft
	if(hasKicked) hasKicked = false
	if(analyser.hasKicked(20, average) && kickTime > 1900) {
		hasKicked = true; 
		kickTime = 0;
	}

	// Sound data
	ease = analyser.average > 50 ? eases[1] : eases[0]
	average = analyser.getEaseFrequency(ease );

	if(hasKicked) {
		// genRandomSide();
		genSpreadTarget();
	}

	triangles = [];
	draw(Math.min(200, average * 2));
	requestAnimationFrame(render);
}

requestAnimationFrame(render);
var control = new GlobalControl("#global-control", store);
manageFullScreen();

