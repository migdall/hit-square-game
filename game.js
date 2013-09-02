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
		width: 640,
		height: 320
	});

	var layer = new Kinetic.Layer();

	var rect = new Kinetic.Rect({
		x: 239,
		y: 75,
		width: 100,
		height: 50,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4
	});

	layer.add(rect);

	stage.add(layer);
});