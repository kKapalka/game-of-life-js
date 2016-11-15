// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d')

// canvas and grid size defaults
var gridWidth = 130;
var gridHeight = 60;
var gridSquareWidth = 10;

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

			// counts alive or dead for neighbours
			var count = countNearby(x,y);
			
			//neighbors=3 == cell is alive (born or not)
			if(count==3) gridNext[x][y]=1;
				//neighbors=2 == cell stays alive
				else if(count==2 && grid[x][y]==1) gridNext[x][y]=1;
				//otherwise is dead
				else gridNext[x][y]=0;
		}
	}
	// replace old grid with new population grid
	var temp = gridNext;
	gridNext=grid;
	grid=temp;
}

// count grid neighbours
function countNearby(x,y){
	var count = 0;
	
	for(var i=x+gridWidth-1;i<x+gridWidth+2;i++){
		for(var j=y+gridHeight-1;j<y+gridHeight+2;j++){
			// iterate through 3x3 square of cells except itself
			if(i%gridWidth!=x || j%gridHeight!=y){
				// modulo lets cells loop around the screen
			  count+=Number(grid[i%gridWidth][j%gridHeight]);
				}			
			}		
		}		
	// return count value
	return count;
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
	window.setTimeout(gameLoop, 150);
};

// start game
gameLoop();
