//Holds killer blocks, golden dots, lasers, switches, etc.
GM.objectList = (function(){
	var that = {};
	var kblockroot = null; //linked list of killer blocks
	var dotroot = null;
	var lgroot = null;
	var numDots = 0;


	function addLG(x,y,dx,dy){
		var lg = new LaserGun();
		lg.setX(x);
		lg.setY(y);
		lg.setAngle(dx,dy);
		lg.next = lgroot;
		lgroot = lg;
	}

	function addDot(x,y){
		var d = new Dot();
		d.setX(x);
		d.setY(y);
		d.next = dotroot;
		dotroot = d;
		numDots++;
	}
	that.paint = function(ctx){
		for(var n = kblockroot; n != null; n = n.next){
			n.paint(ctx);
		}
		for(var n = dotroot; n != null; n = n.next){
			n.paint(ctx);
		}
		for(var n = lgroot; n != null; n = n.next){
			n.paint(ctx);
		}
	};
	that.update = function(){
		for(var n = lgroot; n != null; n = n.next){
			n.update();
		}
	}
	that.generateObjects = function(){
		var n = new KBlock();
		n.setX(50);
		n.setY(100);
		n.setWidth(10);
		n.setHeight(200);
		n.setHidden(true);
		kblockroot = n;
		addDot(300,350);
		addDot(400,360);
		addLG(100,100,1,2);
		
	}
	that.getKBlockRoot  = function(){
		return kblockroot;
	}
	that.importObjects = function(jobj){
		//implement with builder
	}
	that.getNumDots = function(){
		return numDots;
	}
	//check and remove dots
	that.checkDotCollisions = function(p){
		var prev = null;
		for(var n = dotroot; n != null; n = n.next){
			if(n.collidingWith(p)){
				if(prev == null){
					dotroot = dotroot.next;
				}
				else{
					prev.next = n.next;
				}
				numDots--;
				return true;
			}
			prev = n;
		}
		return false;
	};
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