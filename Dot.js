function Dot(){
	this._width = 10;
	this._height = 10;
	this.paint = function(ctx){
		ctx.fillStyle = "#4A77FF";
		var r = this._width/2;
		var cx = this._x + r;
		var cy = this._y + r;
		ctx.beginPath();
		ctx.arc(cx,cy,r,0,Math.PI * 2, true);
		ctx.fill();
		ctx.fillStyle = "#000";
	}
}
GM.utils.inherits(Dot, Movable);