/**
 * Hit Square Game
 * Author: Jesus Noland
 * Date Created: 09-02-2013
 * File: game.js
 * Purpose: Holds the interactivity of the game.
 */

// game code
function Point(point)
{
	this.point = point;
	this.hit = false;
}

function Letter()
{
	this.points = [];
}

Letter.prototype.setPoints = function(pointsArray) {
	for(var index = 0; index < pointsArray.length; index++) {
		this.points.push(new Point(pointsArray[index]));
	}
}

Letter.prototype.isPoint = function(point) {
	for(var index = 0; index < this.points.length; index++) {
		if(this.points[index].point == point) {
			this.points[index].hit = true;
			return true;
		}
	}

	return false;
}

Letter.prototype.allPointsHit = function() {
	for(var index = 0; index < this.points.length; index++) {
		if(this.points[index].hit == false) {
			return false;
		}
	}

	return true;
}

var theLetterI = new Letter();
theLetterI.setPoints([2, 3, 4, 9, 15, 21, 26, 27, 28]);

$(document).ready(function() {
	var stage = new Kinetic.Stage({
		container: 'gameBoard',
		width: 940,
		height: 420
	});

	var layer = new Kinetic.Layer();

	// set the game board
	// set mouse event for each piece of the game board
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
				if(theLetterI.isPoint(layer.children.indexOf(this))) {
					this.setFill('red');
					layer.draw();
					if(theLetterI.allPointsHit()) {
						alert("Great job, you found the letter!");
					}
				} else {
					this.setFill('blue');
					layer.draw();
				}
			}));
		}
	}

	stage.add(layer);
});