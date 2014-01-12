//Holds killer blocks, golden dots, lasers, switches, etc.
GM.objectList = (function(){
	var that = {};
	var kblockroot = null; //linked list of killer blocks

	that.paint = function(ctx){
		for(var n = kblockroot; n != null; n = n.next){
			n.paint(ctx);
		}
	};
	that.generateObjects = function(){
		var n = new KBlock();
		n.setX(50);
		n.setY(100);
		n.setWidth(10);
		n.setHeight(200);
		kblockroot = n;
	}
	that.importObjects = function(jobj){
		//implement with builder
	}
	that.collidingKBlocks = function(m){
		for(var n = kblockroot; n != null; n = n.next){
			if(n.collidingWith(m)){
				return n;
			}
		}
		return null;
	};
	that.destroy = function(){
		kblockroot = null;
	};

	return that;
}());