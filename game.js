// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx=canvas.getContext('2d');

// canvas and grid size defaults
var gridWidth = 1300;
var gridHeight = 600;
var gridSquareWidth = 1;

canvas.width = gridWidth * gridSquareWidth;
canvas.height = gridHeight * gridSquareWidth;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var grid = [];
var gridNext = [];
var storage=[];

// create default grid array
// sudo random noise

for (var x = 0; x < gridWidth; x++) {
	grid[x] = [];
	gridNext[x] = [];
	storage[x]=[];
	for (var y = 0; y < gridHeight; y++) {
		grid[x][y] = 0;
		gridNext[x][y] = 0;
		storage[x][y]=0;

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
			if(Boolean(grid[x][y])) addNearby(x,y);			
		}
	}
	fillNext();
	// replace old grid with new population grid
	var temp = gridNext;
	gridNext=grid;
	grid=temp;
}

// count grid neighbours
function addNearby(x,y){
	var i=x+gridWidth-1,j=y+gridHeight-1;
	storage[i%gridWidth][j%gridHeight]+=1;
	storage[i%gridWidth][y]+=1;
	storage[i%gridWidth][(j+2)%gridHeight]+=1;
	storage[x][j%gridHeight]+=1;              
	storage[x][(j+2)%gridHeight]+=1;
	storage[(i+2)%gridWidth][j%gridHeight]+=1;
	storage[(i+2)%gridWidth][y]+=1;
	storage[(i+2)%gridWidth][(j+2)%gridHeight]+=1;
}
function fillNext(){
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
			gridNext[x][y]=storage[x][y]==3?1:(storage[x][y]==2?grid[x][y]:0);
			storage[x][y]=0;
		}
	}
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
