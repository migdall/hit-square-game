/**
 * Hit Square Game
 * Author: Jesus Noland
 * Date Created: 09-02-2013
 * File: game.js
 * Purpose: Holds the interactivity of the game.
 */


// game variables
var GAME_WIDTH = 840,
	GAME_HEIGHT = 420
	NEXT_LEVEL_TEXT_WIDTH = 300,
	NEXT_LEVEL_TEXT_HEIGHT = 125,
	NEXT_LEVEL_X = 520,
	NEXT_LEVEL_Y = 50;

// kinectic's staging area
var beginLevel = true;
var endLevel = false;
var stage;
var layer;

// game code
function Point(point)
{
	this.point = point;
	this.hit = false;
}

function Letter(name)
{
	this.points = [];
	this.name = name;
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
	} else {
		return -1;
	}
	this.used.push(num);
	return this.letters[num];
}

var theLetterI = new Letter("I");
theLetterI.setPoints([2, 3, 4, 9, 15, 21, 26, 27, 28]);
var theLetterL = new Letter("L");
theLetterL.setPoints([2, 8, 14, 20, 26, 27]);
var theLetterO1 = new Letter("O");
theLetterO1.setPoints([3, 8, 14, 21, 16, 10]);
var theLetterO2 = new Letter("O");
theLetterO2.setPoints([3, 8, 14, 21, 16, 10]);
var theLetterV = new Letter("V");
theLetterV.setPoints([0, 7, 14, 9, 4]);
var theLetterE = new Letter("E");
theLetterE.setPoints([4, 3, 2, 8, 14, 15, 16, 20, 26, 27, 28]);
var theLetterY = new Letter("Y");
theLetterY.setPoints([0, 7, 14, 9, 4, 20, 26]);
var theLetterU = new Letter("U");
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

// text methods
var nextLevelText = new Kinetic.Text({
	x: NEXT_LEVEL_X,
	y: NEXT_LEVEL_Y,
	text: "You've found the correct letter! Click here to continue.",
	fontSize: 28,
	fontFamily: 'Calibri',
	fill: '#222',
	width: NEXT_LEVEL_TEXT_WIDTH,
	height: NEXT_LEVEL_TEXT_HEIGHT,
	padding: 20,
	align: 'center'	
}).on('mousedown', function() {
	theLetter = letterBin.nextLetter();
	if(theLetter != -1) {
		drawGameBoard(GAME_WIDTH, GAME_HEIGHT);
	} else {
		drawEndGame(GAME_WIDTH, GAME_HEIGHT);
	}
});

var nextLevelBackgroundRect = new Kinetic.Rect({
	x: NEXT_LEVEL_X,
	y: NEXT_LEVEL_Y,
	stroke: '#555',
	strokeWidth: 5,
	fill: '#ddd',
	width: 300,
	height: NEXT_LEVEL_TEXT_HEIGHT,
	shadowColor: 'black',
	shadownBlur: 10,
	shadowOffset: [10, 10],
	shadowOpacity: 0.2,
	cornerRadius: 10
});

// the end game drawing
function drawEndGame(width, height) {
	stage = new Kinetic.Stage({
		container: 'game',
		width: width,
		height: height
	});

	layer = new Kinetic.Layer();

	nextLevelText = new Kinetic.Text({
		x: ((width/2) - NEXT_LEVEL_TEXT_WIDTH),
		y: ((height/2) - NEXT_LEVEL_TEXT_HEIGHT),
		text: "You've found all of the letters.",
		fontSize: 28,
		fontFamily: 'Calibri',
		fill: '#222',
		width: NEXT_LEVEL_TEXT_WIDTH,
		height: NEXT_LEVEL_TEXT_HEIGHT,
		padding: 20,
		align: 'center'	
		}).on('mousedown', function() {
			theLetter = letterBin.nextLetter();
			if(theLetter != -1) {
				drawGameBoard(GAME_WIDTH, GAME_HEIGHT);
			} else {
				drawEndGame(GAME_WIDTH, GAME_HEIGHT);
			}
	});

	nextLevelBackgroundRect = new Kinetic.Rect({
		x: ((width/2) - NEXT_LEVEL_TEXT_WIDTH),
		y: ((height/2) - NEXT_LEVEL_TEXT_HEIGHT),
		stroke: '#555',
		strokeWidth: 5,
		fill: '#ddd',
		width: 300,
		height: NEXT_LEVEL_TEXT_HEIGHT,
		shadowColor: 'black',
		shadownBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		cornerRadius: 10
	});

	layer.add(nextLevelBackgroundRect);
	layer.add(nextLevelText);
	layer.draw();

	stage.add(layer);
}

function drawGameBoard(width, height) {
	stage = new Kinetic.Stage({
		container: 'game',
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
						$("#textbin").append(theLetter.name);
						$("#textbin").append("&nbsp;");
						layer.add(nextLevelBackgroundRect);
						layer.add(nextLevelText);
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
	//GAME_WIDTH = $("#game").width();
	drawGameBoard(GAME_WIDTH, GAME_HEIGHT);
});