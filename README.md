# game-of-life-js
An implementation of Conway's Game of Life using Javascript and the html5 Canvas API

Based off: [benbyford.com](http://benbyford.com/experiments/conways-game-of-life-in-javascript/)

Version 1.2:
	-Further code optimization: approx. 18% more calls of draw() function
	- and 30% less time used by countNearby() function when compared to v1.1.

Version 1.1:
	-Fixed a bug where cells swarmed the grid (due to faulty grid replacement)
	-Added a feature: Cells and neighbors loop around the screen.
	-Optimization: game.js weighs 9% less.
