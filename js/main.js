var angle = 0;
var animation;

$(".cog3").data('correctPeg', $(".peg3"));
$(".cog6").data('correctPeg', $(".peg4"));
$(".cog2").data('correctPeg', $(".peg7"));
$(".cog1").data('correctPeg', $(".peg8"));
$(".cog4").data('correctPeg', $(".peg10"));
$(".cog5").data('correctPeg', $(".peg11"));

var rotate = function(){
    angle+=3;
	$(".handle").rotate(angle);

	// Adapted from:
	//  http://stackoverflow.com/questions/5177867/how-to-find-out-about-the-snapped-to-element-for-jquery-ui-draggable-elements
	var cogs = [$(".cog3"), $(".cog6"), $(".cog2"), $(".cog1"), $(".cog4"), $(".cog5")];
	var numCogsTurning = 0;

	$.each(cogs, function (index, cog) {

		/* Get all possible elements we can snap to */
		var snappables = cog.data('ui-draggable').snapElements;
	    var correctPeg = cog.data('correctPeg')[0];

	    // Look through snap targets for one which is 'snapping' and is also the correctPeg
	  	var snappedToCorrectPeg = false;
	  	if (typeof snappables !== "undefined") {
		  	$.each(snappables, function (i, element) {
		  		if (element.snapping && correctPeg == element.item) {
		  			snappedToCorrectPeg = true;
		  		}
		  	});
	  	}

	  	//and rotate it
	  	if (snappedToCorrectPeg) {
	  		numCogsTurning = numCogsTurning + 1;
			if (index % 2 == 1) /* then its odd */ {
		  		cog.rotate(angle);
		  	} else /* then its even */ {
		  		cog.rotate(-angle);
		  	}
	    } else {
	    	return false;
	    }
	});

	//Rotate the pulley cog if all other cogs rotating
	if (numCogsTurning == cogs.length) {
		$(".pulley1").rotate(-angle);
		$(".cornchip").animate({top: "+=3"}, 1);
		$(".rope2").animate({height: "+=3"}, 1);
	}

	
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
$(".peg").droppable(
{ 
	accept: ".cog",
	drop: function(event, ui)
	{
		ui.draggable.data('dropped', true);
	}
});

$(".cog").draggable({ snap: ".peg", snapMode: "inner", 
	containment: "parent", revert: false,
	stop: function(event, ui) {
		var cog = $(this);
		if (isSnapped(cog) == false) {
			cog.css({top:cog.parent().height() - (cog.find("img").height() + cog.height()) / 2});
		}
	}

});


function isSnapped(cog) {
	var snappables = cog.data('ui-draggable').snapElements;
	var returnValue = false;

	if (typeof snappables !== "undefined") {
		$.each(snappables, function (i, element) {
			if (element.snapping) {
				returnValue = true;
		  		return false; // stop looping, we found one
		 	}
		});
	}
	return returnValue;
}

