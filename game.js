/**
 * Hit Square Game
 * Author: Jesus Noland
 * Date Created: 09-02-2013
 * File: game.js
 * Purpose: Holds the interactivity of the game.
 */


$(document).ready(function() {
	var stage = new Kinetic.Stage({
		container: 'gameBoard',
		width: 940,
		height: 420
	});

	var layer = new Kinetic.Layer();

	// set the game board
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 6; i++) {
			layer.add(new Kinetic.Rect({
				x: (39+(100*i)),
				y: (75+(50*j)),
				width: 100,
				height: 50,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 4
			}).on('mousedown', function() {
				this.setFill('red');
				layer.draw();
			}));
		}
	}

	// set mouse event for each piece of the game board
	

	stage.add(layer);
});