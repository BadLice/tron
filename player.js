class Player
{
	constructor(x,y,dir,col,pxWidth,id)
	{
		this.ID=id;
		this.pxWidth=pxWidth;
		this.x=x;
		this.y=y;
		this.width=5;
		this.direction=dir;//0-down, 1-left ,2-up, 3-right
		this.dead=false;
		
		this.timex=millis();
		this.timeLeaseMove=0.02;//in seconds

		this.col=col;
		this.headColor = color(255-this.col.levels[0],255-this.col.levels[1],255-this.col.levels[2])
	}

	draw()
	{
		fill(this.headColor);
		stroke(this.col);
		noStroke();
		rect(this.x,this.y,this.width,this.width);
	}

	update()
	{
		this.control();
		if(this.move())
			this.die();
	}

	toMove()
	{
		if(millis()-this.timex>this.timeLeaseMove*1000)
		{
			this.timex=millis();
			return true;
		}	
		else
			return false;
	}

	markCell()
	{
		var c = this.getCurrentCell();

		if(!c.isOccupied())
		{
			c.occupy(this.ID);
		}
	}

	getCellX()
	{
		return this.x/this.pxWidth;
	}

	getCellY()
	{
		return this.y/this.pxWidth;
	}

	getCurrentCell()
	{
		return mapGame.map[this.getCellX()][this.getCellY()];
	}

	move()
	{
		if(this.toMove())
		{
			switch(this.direction)
			{
				//down
				case 0:
					if(this.y+this.pxWidth+this.width<=height)
						this.y+=this.pxWidth;
				break;

				//left
				case 1:
					if(this.x-this.pxWidth>=0)
						this.x-=this.pxWidth;
				break;

				//up
				case 2:
					if(this.y-this.pxWidth>=0)
						this.y-=this.pxWidth;
				break;

				//rigth
				case 3:		
					if(this.x+this.pxWidth+this.width<=width)
						this.x+=this.pxWidth;
				break;
			}

			return true;
		}

		return false;
	}

	control()
	{
		if(this.ID==0)
		{
			if(keyIsDown(UP_ARROW) && this.direction!=0)
			this.direction=2;
			if(keyIsDown(DOWN_ARROW)&& this.direction!=2)
				this.direction=0;
			if(keyIsDown(RIGHT_ARROW)&& this.direction!=1)
				this.direction=3;
			if(keyIsDown(LEFT_ARROW)&& this.direction!=3)
				this.direction=1;	
		}
		else if(this.ID==1)
		{
		
			if(keyIsDown(87) && this.direction!=0)
				this.direction=2;
			if(keyIsDown(83)&& this.direction!=2)
				this.direction=0;
			if(keyIsDown(68)&& this.direction!=1)
				this.direction=3;
			if(keyIsDown(65)&& this.direction!=3)
				this.direction=1;
		}
	}

	reachedEdges()
	{
		return (!(this.x+this.pxWidth+this.width<=width && this.y-this.pxWidth>=0 && this.x-this.pxWidth>=0 && this.y+this.pxWidth+this.width<=height));
	}

	die()
	{
		var c = this.getCurrentCell();
		
		if(c.isOccupied() || this.reachedEdges())
		{
			this.dead=true;
		}
		else
			this.markCell();

	}


	gameOver()
	{
		if(this.dead)
		{
			fill(255,0,0);
			noStroke();
			text("GAME OVER",width/2-100,height/2);

			fill(255);
			noStroke();
			text("PLAYER "+(this.ID+1)+" LOSE",width/2-120,height/2+30);
			noLoop();

		}
	}



}