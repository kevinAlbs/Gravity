function LaserGun(){
	this._width = 5;
	this._height = 5;
	var firing = false,
		closestT = 1000,
		closestObj = null,
		PULSATE_TIME = 1000,
		pulsateTimer = PULSATE_TIME;

	var dx = 1,dy = 1;//change in x and y for line
	var that = this;
	//ll is linked list
	function determineClosest(ll){
		var startX = that._x + that._width/2,
			startY = that._y + that._height/2;
		for(var e = ll; e != null; e = e.next){
			//calculate time at which the x matches either side of the platform, see if the y is within bounds

			var ex = e.x || e.getX();
			var ey = e.y || e.getY();
			var ew = e.width || e.getWidth();
			var eh = e.height || e.getHeight();
			var tx = (ex - startX)/dx;
			var projY = startY + tx * dy;

			if(ey < projY && projY < ey + eh){
				if(tx > 0 && tx < closestT){
					closestT = tx;
					closestObj = e;
				}
			}
			tx = ((ex + ew) - startX)/dx;
			projY = startY + tx * dy;
			if(ey < projY && projY < ey + eh){
				if(tx > 0 && tx < closestT){
					closestT = tx;
					closestObj = e;
				}
			}
			//check just one other side (it must hit at least two sides), so checking all but one is fine
			var ty = (ey - startY)/dy;
			var projX = startX + ty * dx;
			if(ex < projX && projX < ex + ew){
				if(ty > 0 && ty < closestT){
					closestT = ty;
					closestObj = e;
				}
			}
		}
	}

	this.setAngle = function(x,y){
		dx = x;
		dy = y;
	};

	this.update = function(){

		//check where to paint
		closestT = 1000;
		closestObj = null;
		pulsateTimer -= GM.game.delta;
		if(pulsateTimer < 0){
			firing = !firing;
			pulsateTimer = PULSATE_TIME;
		}

		if(firing){
			var fakePlayer = {
				x: GM.game.getPlayerX(),
				y: GM.game.getPlayerY(),
				width: GM.game.getPlayerWidth(),
				height: GM.game.getPlayerHeight()
			};
			determineClosest(GM.platformList.getRoot());
			determineClosest(GM.objectList.getKBlockRoot());
			
			determineClosest(fakePlayer);
			if(closestObj == fakePlayer){
				GM.game.playerDies();
			}
		}


	};
	this.paint = function(ctx){
		if(firing){
			var gtx = this._x + this._width/2;
			var gty = this._y + this._height/2;
			ctx.strokeStyle = "#75FA23";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(gtx, gty);
			ctx.lineTo(gtx + dx * closestT, gty + dy * closestT);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.fillStyle = "#555";
		ctx.fillRect(this._x, this._y, this._width, this._height);
		ctx.fillStyle = "#000";
	};

	firing = true;
}
GM.utils.inherits(LaserGun, Movable);