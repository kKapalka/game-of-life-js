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
var storage=[];

// create default grid array
// sudo random noise

for (var x = 0; x < gridWidth; x++) {
	grid[x] = [];
	storage[x]=[];
	for (var y = 0; y < gridHeight; y++) {
		grid[x][y] = Math.round(Math.random()-0.35);
		storage[x][y]=0;		
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
}

// add to the Neighbor storage
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
//Change the current grid according to neighbor count for each cell + refresh the storage
function fillNext(){
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
			grid[x][y]=storage[x][y]==3?1:(storage[x][y]==2?grid[x][y]:0);
			storage[x][y]=0;
		}
	}
}


// game update
function update(dt) {
	
	// draw result
	draw();	
	// iterate simulation rules
	life();

	
}

function draw() {
// clear canvas
	ctx.fillStyle = '#fee';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#ee66aa";
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {		
			if (grid[x][y]) {				
				ctx.fillRect(x, y, 1,1);
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
	window.setTimeout(gameLoop);
};


// start game

gameLoop();
