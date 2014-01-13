//Holds killer blocks, golden dots, lasers, switches, etc.
GM.objectList = (function(){
	var that = {};
	var kblockroot = null; //linked list of killer blocks
	var dotroot = null;
	var lgroot = null;
	var numDots = 0;
	var stageEnd = false;
	var endBlock = null;
	

	function addEnd(x,y,w,h){
		endBlock = new Movable();
		endBlock.setX(x);
		endBlock.setY(y);
		endBlock.setWidth(w);
		endBlock.setHeight(h);
	}

	that.noMoreDots = function(){
		stageEnd = true;
	}

	function addKBlock(x,y,w,h,hid){
		var n = new KBlock();
		n.setX(x);
		n.setY(y);
		n.setWidth(w);
		n.setHeight(h);
		n.setHidden(hid);
		n.next = kblockroot;
		kblockroot = n;
	}
	function addLG(x,y,dx,dy,on,off){
		var lg = new LaserGun();
		lg.setX(x);
		lg.setY(y);
		lg.setAngle(dx,dy);
		lg.setTime(on,off);
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
		if(stageEnd){
			ctx.fillStyle = "#ED3939";
			endBlock.paint(ctx);
		}
		else{
			ctx.fillStyle = "#E3AFAF";
			endBlock.paint(ctx);

		}
	};
	that.update = function(){
		for(var n = lgroot; n != null; n = n.next){
			n.update();
		}
	}
	that.generateObjects = function(){
		addKBlock(50,100,10,200,true);
		addDot(300,350);
		addDot(400,360);
		addLG(100,100,1,2,1000,1000);
		addEnd(100,340,10,10);
	}
	that.getKBlockRoot  = function(){
		return kblockroot;
	}
	that.importObjects = function(data){
		//implement with builder
		for(var i = 0; i < data.kblocks.length; i++){
			var k = data.kblocks[i]
			addKBlock(k.x,k.y,k.width,k.height,k.hidden);
		}
		for(var i = 0; i < data.dots.length; i++){
			var d = data.dots[i];
			addDot(d.x,d.y);
		}
		for(var i = 0; i < data.laserguns.length; i++){
			var lg = data.laserguns[i];
			addLG(lg.x,lg.y,lg.dx,lg.dy,lg.timeOn,lg.timeOff);
		}
		var e = data.end;
		addEnd(e.x,e.y,e.width,e.height);
		if(numDots == 0){
			that.noMoreDots();
		}
	}
	that.getNumDots = function(){
		return numDots;
	}
	that.checkEndBlockCollision = function(m){
		return stageEnd && endBlock.collidingWith(m);
	};
	//check and remove dots
	that.checkDotCollisions = function(p){
		var prev = null;
		for(var n = dotroot; n != null; n = n.next){
			if(n.collidingWith(p)){
				GM.game.generateParticles({
					x:n.getX() + n.getWidth()/2,
					y:n.getY() + n.getHeight()/2,
					color: "#4A77FF",
					init_speed_x_variance: .1,
					init_speed_y_variance: .1,
					num: 10
				})
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
		dotroot = null;
		lgroot = null;
		endBlock = null;
		numDots = 0;
		stageEnd = false;
	};

	return that;
}());