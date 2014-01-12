function KBlock(){
	this._hidden = false;
	this.setHidden = function(val){
		this._hidden = val;
	}
	this.getHidden = function(){return this._hidden;}
	this.paint = function(ctx){
		if(!this._hidden){
			ctx.fillStyle = "#7FE625";
			ctx.fillRect(this._x, this._y, this._width, this._height);
			ctx.fillStyle = "#000";
		}
	}
}
GM.utils.inherits(KBlock, Movable);