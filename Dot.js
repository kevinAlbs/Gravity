function Dot(){
	this._width = 10;
	this._height = 10;
	this.paint = function(ctx){
		ctx.fillStyle = "#FADD23";
		ctx.fillRect(this._x, this._y, this._width, this._height);
		ctx.fillStyle = "#000";
	}
}
GM.utils.inherits(Dot, Movable);