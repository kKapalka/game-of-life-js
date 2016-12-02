# game-of-life-js
An implementation of Conway's Game of Life using Javascript and the html5 Canvas API

Based on an implementation made by: [benbyford.com](http://benbyford.com/experiments/conways-game-of-life-in-javascript/)

Version 1.4:
	-Further adjustments resulting in another framerate leap, to 15.86

Version 1.3:
	-Applied a bigger grid. 1300x600, with 1px each cell.
	-Bottleneck removal: Now, instead of counting neighbors for each cell,
	every living cell applies a buffer to each cell surrounding it.
	This improves the framerate by 75%, from 4.44 to 7.78 (according to construed samples).

Version 1.2:
	-Further code optimization: approx. 18% more calls of draw() function
	- and 30% less time used by countNearby() function when compared to v1.1.

Version 1.1:
	-Fixed a bug where cells swarmed the grid (due to faulty grid replacement)
	-Added a feature: Cells and neighbors loop around the screen.
	-Optimization: game.js weighs 9% less.
