function KBlock(){
	this.paint = function(ctx){
		ctx.fillStyle = "#F00";
		ctx.fillRect(this._x, this._y, this._width, this._height);
		ctx.fillStyle = "#000";
	}
}
GM.utils.inherits(KBlock, Movable);