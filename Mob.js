function Mob(){
	this._state = "";//describing the higher behavior of a mob, eg. attacking_player, or follow_player
	this._jumpSpeed = -.61;
	this._walkingSpeed = 5;//walking speed
	this._walking = false;
	this._ducking = false;
	this._hasLongJump = false;
	this._facing = 1;//-1 for facing left, 1 for facing right, NEVER 0
	this._curPlatform = null;
	this._noPlatformCollision = false;//true if this mob does not collide platforms
	this.name = "";

	//dir must be -1, 0, or 1
	this.moveX = function(dir){
	};
	this.unMoveX = function(){
	}

	this.jump = function(){
		if(this.onPlatform() && !this._ducking){
			this._yVel = this._jumpSpeed;
			this._jumping = true;
		}
	}	
	this.unjump = function(){
		if(this._hasLongJump){
			if(this._yVel < -.20){
				this._yVel = -.20;
			}
		}

	}

	this.onPlatform = function(){
		if(this.whichPlatform() != null){return true;}
		else{return false;}
	}
	//returns which platform the mob is on (or null if nothing)
	/* TODO: modify for changing gravity */
	this.whichPlatform = function(){
		if(this._curPlatform == null){
			this._curPlatform = GM.platformList.getRoot();
		}
		for(var p = this._curPlatform; p != null; p = p.next){
			var r = GM.platformList.collPossibleX(this, p);
			if(r == 0){
				//possible, check if player is on top
				if(this._y + this._height + 1 == p._y){ //also check y because most of the time you will be jumping
					return p;
				}
			}
		}
		return null;
	};

	/* Extends the movable gravityUpdate to include platform collisions */
	this.movementUpdate = function(){
		if(!this.onPlatform()){
			this.applyGravity();
		}

		if(!this._noPlatformCollision){
			if(this._curPlatform == null){
				this._curPlatform = GM.platformList.getRoot();
			}
			var first = null;//first possible platform found
			for(var p = this._curPlatform; p != null; p = p.next){
				this.collMovingStatic(this, p, true);
			}
		}
		Mob.prototype.movementUpdate.call(this);

		if(this.onPlatform()){
			this._jumping = false;
		}
	}
}

GM.utils.inherits(Mob, Movable);