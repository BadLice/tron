
class Map
{
	constructor(w)
	{
		this.width = w;
		this.map=[];

		for(var i=0;i<width/this.width;i++)
		{
			this.map[i]=[];

			for(var j=0;j<height/this.width;j++)
			{
				this.map[i][j] = new Cell(i*this.width,j*this.width,this.width);
			}
		}
	}

	draw()
	{
		
		for (var i = this.map.length - 1; i >= 0; i--) {
			for (var j = this.map[i].length - 1; j >= 0; j--) {
				if(this.map[i][j].isOccupied())
				this.map[i][j].draw();
			}
		}
	}
}

class Cell
{
	constructor(x,y,w)
	{
		this.x=x;
		this.y=y;
		this.w=w;
		this.occupied=-1;//id of player that passed on it

		this.col=color(0,0,0);
	}

	draw()
	{

		fill(this.col);
		// stroke(255);
		noStroke();
		rect(this.x,this.y,this.w,this.w);
	}

	occupy(id)
	{
		this.occupied=id;
		this.col = players[this.occupied].col;
	}

	isOccupied()
	{
		return (this.occupied!=-1);
	}

	getOccupied()
	{
		return this.occupied;
	}
}