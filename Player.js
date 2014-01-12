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
	this._jumpSpeed = -.5;
	this._hasLongJump = true;

	this.name = "Kaitlin";
	this.update = function(){
		if(GM.game.mapDebug){
			this._yVel = -.3;
			this._walkingSpeed = .8;
		}
		//call super.update to update hurt state
		Player.prototype.update.apply(this);
		this.movementUpdate();
	};

	this.getWalkingSpeed = function(){return this._walkingSpeed;};
	

	this.paint = function(ctx){
		var xOff = GM.game.getXOffset();
		Player.prototype.paint.call(this, ctx);
	};

	this.jump = function(){
		if(this.onPlatform() && !this._dead){	
			Player.prototype.jump.call(this);
		}
	}
	
	this._die = function(){
		Player.prototype._die.call(this);
	}

};

GM.utils.inherits(Player, Person);