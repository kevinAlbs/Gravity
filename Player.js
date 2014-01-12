/* Since player is only Mob that will ever change gravity, all gravity switching code is here */
function Player(){
	if(this == window){
		return new Player();
	}
	
	//"protected"
	this._x = 80;
	this._y = 210;
	this._walkingSpeed = .3; //in pixels per ms
	this._width = 20; 
	this._height = 20;
	this._jumpSpeed = .5;
	this._hasLongJump = true;

	this.name = "Kaitlin";
		//dir must be -1, 0, or 1
	this.movePerp = function(dir){
		var grav = GM.game.getGravSwitch();
		if(!this._dead){
			if(dir != 0){
				if(!this._ducking){
					this._walking = true;
				}
				this._facing = Math.abs(dir)/dir;
			} 
			else{
				this._walking = false;
			}
			if(grav == 1 || grav == 3){
				this._xVel = dir * this._walkingSpeed;
			}
			else{
				this._yVel = dir * this._walkingSpeed;	
			}
		}
	};
	this.unMovePerp = function(){
		var grav = GM.game.getGravSwitch();
		if(grav == 1 || grav == 3){
			var ab = Math.abs(this._xVel);
			this._walking = false;
			if(ab < .03){
				this._xVel = 0;
			}
			else if(ab > 0){
				this._xVel *= .75;
			}
		}
		else{
			var ab = Math.abs(this._yVel);
			this._walking = false;
			if(ab < .03){
				this._yVel = 0;
			}
			else if(ab > 0){
				this._yVel *= .75;
			}
		}
	}
	this.jump = function(){
		if(this.onPlatform() && !this._dead){
			var grav = GM.game.getGravSwitch();
			console.log(grav);
			if(grav == 1){
				this._yVel = this._jumpSpeed;	
			}
			else if(grav == 2){
				this._xVel = -1 * this._jumpSpeed;
			}
			else if(grav == 3){
				this._yVel = -1 * this._jumpSpeed;
			}
			else if(grav == 4){
				this._xVel = this._jumpSpeed;
			}
			this._jumping = true;
		}
	}	
	this.unjump = function(){
		if(this._hasLongJump){
			var grav = GM.game.getGravSwitch();
			if(grav == 3){
				if(this._yVel < -.20){
					this._yVel = -.20;
				}
			}
			else if(grav == 2){
				if(this._xVel < -.2){
					this._xVel = -.2;
				}
			}
			else if(grav == 1){
				if(this._yVel > .2){
					this._yVel = .2;
				}
			}
			else if(grav == 4){
				if(this._xVel > .2){
					this._xVel = .2;
				}
			}
		}

	}
	//returns which platform the mob is on (or null if nothing)
	/* TODO: possibly round pixels (idk exactly why it still works if player can have decimal position) */
	this.whichPlatform = function(){
		if(this._curPlatform == null){
			this._curPlatform = GM.platformList.getRoot();
		}
		var grav = GM.game.getGravSwitch();
		for(var p = this._curPlatform; p != null; p = p.next){
			if(grav == 1 || grav == 3){
				var r = GM.platformList.collPossibleX(this, p);
				if(r == 0){
					//possible, check if player is on top
					if(grav == 1){
						//check if platform "above"
						if(this._y - 1 == p._y + p._height){
							return p;
						}
					}
					if(grav == 3){
						if(this._y + this._height + 1 == p._y){ 
							return p;
						}
					}
				}
			}
			else if(grav == 2 || grav == 4){
				var r = GM.platformList.collPossibleY(this, p);
				if(r == 0){
					if(grav == 2){
						//check if platform "above"
						if(this._x + this._width + 1 == p._x){
							return p;
						}
					}
					if(grav == 4){
						if(this._x - 1 == p._x + p._width){ 
							return p;
						}
					}
				}
			}
		}
		return null;
	};

	this.update = function(){
		//call super.update to update hurt state
		Player.prototype.update.apply(this);
		this.movementUpdate();
	};

	this.getWalkingSpeed = function(){return this._walkingSpeed;};
	

	this.paint = function(ctx){
		Player.prototype.paint.call(this, ctx);
	};

	
	this._die = function(){
		Player.prototype._die.call(this);
	}

};

GM.utils.inherits(Player, Person);