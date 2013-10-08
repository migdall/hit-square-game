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

function LetterBin()
{
	this.letters = [];
	this.used = [];
}

// return randomly the next letter that hasn't been used
LetterBin.prototype.nextLetter = function() {
	var max = this.letters.length;
	var min = 0;
	var num = Math.floor(Math.random() * (max - min) + min);
	if(this.used.length < this.letters.length) {
		while(this.used.indexOf(num) != -1) {
			num = Math.floor(Math.random() * (max - min) + min);
		}
	}
	this.used.push(num);
	return this.letters[num];
}

var theLetterI = new Letter();
theLetterI.setPoints([2, 3, 4, 9, 15, 21, 26, 27, 28]);
var theLetterL = new Letter();
theLetterL.setPoints([2, 8, 14, 20, 26, 27]);
var theLetterO1 = new Letter();
theLetterO1.setPoints([3, 8, 14, 21, 16, 10]);
var theLetterO2 = new Letter();
theLetterO2.setPoints([3, 8, 14, 21, 16, 10]);
var theLetterV = new Letter();
theLetterV.setPoints([0, 7, 14, 9, 4]);
var theLetterE = new Letter();
theLetterE.setPoints([4, 3, 2, 8, 14, 15, 16, 20, 26, 27, 28]);
var theLetterY = new Letter();
theLetterY.setPoints([0, 7, 14, 9, 4, 20, 26]);
var theLetterU = new Letter();
theLetterU.setPoints([1, 7, 13, 19, 25, 26, 20, 27, 21, 15, 9, 3]);

// add letters to bin for the message
var letterBin = new LetterBin();
letterBin.letters.push(theLetterI);
letterBin.letters.push(theLetterL);
letterBin.letters.push(theLetterO1);
letterBin.letters.push(theLetterV);
letterBin.letters.push(theLetterE);
letterBin.letters.push(theLetterY);
letterBin.letters.push(theLetterO2);
letterBin.letters.push(theLetterU);

// the current letter
var theLetter = letterBin.nextLetter();

// kinectic's staging area
var stage;
var layer;
function drawGameBoard(width, height) {
	stage = new Kinetic.Stage({
		container: 'gameBoard',
		width: width, //940
		height: height //420
	});

	layer = new Kinetic.Layer();

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
				if(theLetter.isPoint(layer.children.indexOf(this))) {
					this.setFill('red');
					layer.draw();
					if(theLetter.allPointsHit()) {
						for(var x = 0; x < layer.children.length; x++) {
							if(theLetter.isPoint(x) == false) {
								layer.children[x].hide();
							}
						}
						layer.draw();
					}
				} else {
					this.setFill('blue');
					layer.draw();
				}
			}));
		}
	}

	stage.add(layer);
}

$(document).ready(function() {
	drawGameBoard(940, 420);
});