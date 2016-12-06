// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx=canvas.getContext('2d');
//setup display of generation count
var idgen = document.getElementById('generation');
var gen=0;
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
var alivetab=[];
var alivei=0;
//alivetab stores coordinates of every cell that is alive.
//alivei - both iterates through the alivetab and indicates the position of a (last+1) living cell

// create default grid array - grid filled in approx. 15% with randomly put cells + get coords of alive cells

for (var x = 0; x < gridWidth; x++) {
	grid[x] = [];
	storage[x]=[];
	for (var y = 0; y < gridHeight; y++) {
		grid[x][y] = Math.round(Math.random()-0.35);
		storage[x][y]=0;
		if (grid[x][y]) alivetab[alivei++]=x*gridWidth+y;	
	}
}

// life init grid
function life(){
	// touch each grid coord
	for (var x = 0; x < alivei; x++) addNearby(Math.round((alivetab[x]/gridWidth)-0.5),alivetab[x]%gridWidth);
	alivei=0;
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
//Change the current grid according to neighbor count for each cell + store coords of alive cell + refresh the storage
function fillNext(){
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
			grid[x][y]=storage[x][y]==3?1:(storage[x][y]==2?grid[x][y]:0);
			if (grid[x][y]) alivetab[alivei++]=x*gridWidth+y;
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
	//indicate generation count
	idgen.innerHTML="Generation: "+gen;
	gen++
	
}

function draw() {
// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height); //it appears to be easier for the browser once done this way
	ctx.fillStyle = '#fee';	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#ee66aa";
	for (var x = 0; x < alivei; x++) {			
				ctx.fillRect(Math.round((alivetab[x]/gridWidth)-0.5), alivetab[x]%gridWidth, 1,1);
			
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
