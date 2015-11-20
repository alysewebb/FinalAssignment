var angle = 0;
var animation;

var rotate = function(){
    angle+=3;
	$(".handle").rotate(angle);
};

$(".handle").mousedown(function() {	
	animation = setInterval(rotate,20);
});

$(".handle").mouseout(function() {	
	clearInterval(animation);
});

$(".handle").mouseup(function() {	
	clearInterval(animation);
});