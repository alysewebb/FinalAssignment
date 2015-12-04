var angle = 0;
var animation;

$(".cog3").data('correctPeg', $(".peg1"));

var rotate = function(){
    angle+=3;
	$(".handle").rotate(angle);

	// Adapted from:
	//  http://stackoverflow.com/questions/5177867/how-to-find-out-about-the-snapped-to-element-for-jquery-ui-draggable-elements
	var cog3 = $(".cog3");

	/* Get all possible elements we can snap to */
	var snappables = cog3.data('ui-draggable').snapElements;
    var correctPeg = cog3.data('correctPeg')[0];

    // Look through snap targets for one which is 'snapping' and is also the correctPeg
  	var snappedToCorrectPeg = false;
  	$.each(snappables, function (index, element) {
  		if (element.snapping && correctPeg == element.item) {
  			snappedToCorrectPeg = true;
  		}
  	});

  	//and rotate it
  	if (snappedToCorrectPeg) {
		cog3.rotate(-angle);
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
	// start: function(event, ui) {
	// 	ui.helper.data('dropped', false);
	// },
	// stop: function(event, ui) {

	// 	ui.draggable.css({bottom:'originalBottom', left:'originalLeft'})
	// }

});




