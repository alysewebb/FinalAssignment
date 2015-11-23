var angle = 0;
var animation;

var rotate = function(){
    angle+=3;
	$(".handle").rotate(angle);
};

//Make the handle cog turn when you hold 
//onto it with the mouse

$(".handle").mousedown(function() {	
	animation = setInterval(rotate,20);
});

$(".handle").mouseout(function() {	
	clearInterval(animation);
});

$(".handle").mouseup(function() {	
	clearInterval(animation);
});

// Make the cogs draggable and snap to the pegs.

$(".Cog").draggable({ snap: ".peg", snapMode: "inner", containment: "parent" });
