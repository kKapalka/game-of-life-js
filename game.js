// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx=canvas.getContext('2d');

// canvas and grid size defaults
var gridWidth = 260;
var gridHeight = 120;
var gridSquareWidth = 5;

canvas.width = gridWidth * gridSquareWidth;
canvas.height = gridHeight * gridSquareWidth;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var grid = [];
var gridNext = [];

// create default grid array
// sudo random noise

for (var x = 0; x < gridWidth; x++) {
	grid[x] = []
	gridNext[x] = []
	for (var y = 0; y < gridHeight; y++) {
		grid[x][y] = [];
		gridNext[x][y] = []

		var rand = Math.random()*100;

		if (rand > 80) {
			grid[x][y] = 1;
		}
	}
}

// life init grid
function life(){
	// touch each grid coord
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
			var count=countNearby(x,y);
			gridNext[x][y]=(count==3?1:(count==2?grid[x][y]:0));
			//3 neighbors = alive; 2 neighbors = previous state. Otherwise = dead
		}
	}
	// replace old grid with new population grid
	var temp = gridNext;
	gridNext=grid;
	grid=temp;
}

// count grid neighbours
function countNearby(x,y){
	var i=x+gridWidth-1,j=y+gridHeight-1;
	return Number(grid[i%gridWidth][j%gridHeight])+
			 Number(grid[i%gridWidth][y])+
			 Number(grid[i%gridWidth][(j+2)%gridHeight])+
			 Number(grid[x][j%gridHeight])+               
			 Number(grid[x][(j+2)%gridHeight])+
			 Number(grid[(i+2)%gridWidth][j%gridHeight])+
			 Number(grid[(i+2)%gridWidth][y])+
			 Number(grid[(i+2)%gridWidth][(j+2)%gridHeight]);
}


// game update
function update(dt) {
	// iterate simulation rules
	life();

	// draw result
	draw();
}

function draw() {
// clear canvas
	ctx.fillStyle = '#fee';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {

			if (grid[x][y] == 1) {
				ctx.fillStyle = "#ee66aa";
				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
			}
		}
	}
}


// The main game loop
var lastTime;
function gameLoop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);

    lastTime = now;
	window.setTimeout(gameLoop, 1);
};


// start game
gameLoop();
