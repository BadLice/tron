var mapGame;
var pxWidth = 5;
var players=[];
function setup()
{
	createCanvas(600,600);
	mapGame = new Map(pxWidth);
	players[0] = new Player(10,height/2,3,color(255,0,0),pxWidth,0);
	players[1] = new Player(width-10,height/2,1,color(0,0,255),pxWidth,1);
}

function draw()
{
	background(51);

	mapGame.draw();
	for (var i = players.length - 1; i >= 0; i--)
	{
		players[i].draw();
		players[i].update();
		players[i].gameOver();
	}
	
	var fps = frameRate();
	textSize(25);
	fill(255,0,0);
	stroke(0);
	text("FPS: " + fps.toFixed(2), 10, height - 10);
}