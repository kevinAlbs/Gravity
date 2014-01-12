function Platform(){
	this.next = null;
	this.prev = null;


	this.paint = function(ctx){
		var xOff = GM.game.getXOffset();
		ctx.fillRect(Math.round(this._x - xOff), Math.round(this._y), this._width, this._height);
	};
}
GM.utils.inherits(Platform, Movable);