//singleton
GM.platformList = (function(){
	var that = {};
	var root = null;//since platforms only have the extra next/prev properties + spikes, I'm going to use Movable objects

	
	that.getRoot = function(){
		return root;//will probably change
	}

	that.paint = function(ctx){
		for(var p = root; p != null; p = p.next){
			p.paint(ctx);
		}
	}
	//WARNING: extremely inefficient and should only ever be used during start-up for enemy initialization
	that.getPlatformBelow = function(o){
		for(var ptr = root; ptr != null; ptr = ptr.next){
			px = ptr._x,
			py = ptr._y,
			ph = ptr._height,
			pw = ptr._width,
			ox = o._x,
			oy = o._y,
			oh = o._height,
			ow = o._width;
			if(py == oy + oh){
				if(px <= ox && ox + ow <= px + pw){
					return ptr;
				}
			}
		}
		return null;
	};
	/*
	uses exported data from builder to make platforms
	ps is an array of objects
	{x,y,width}
	*/
	that.importPlatforms = function(ps){
		for(var i = 0; i < ps.length; i++){
			var p = new Platform();
			p.setX(ps[i].x);
			p.setY(ps[i].y);
			p.setWidth(ps[i].width);
			p.setHeight(ps[i].height);
			if(root == null){
				root = p;
				p.next = null;
				rear = root;
			}
			else{
				rear.next = p;
				p.prev = rear;
				p.next = null;
				rear = p;
			}
		}
	};

	this.generatePlatform = function(x,y,width,height,noAdd){
		var newObj = new Platform();
		newObj.setX(x);
		newObj.setY(y);
		newObj.setWidth(width);
		newObj.setHeight(height);
		if(!noAdd){
			newObj.next = root;
			root = newObj;
		}
		return newObj;
	}
	/*
	From experimentation, seems like maximum y difference is 119 away (up) in exactly 11 frames (I think)
	The maximum x will depend on y. I will have to figure this out later.

	This will generate platforms on the end of the linked list
	*/
	that.generatePlatforms = function(num, difficulty){

		generatePlatform(100,200,100,10);
		generatePlatform(100,150,10,50);
		generatePlatform(50,400,500,10);
		generatePlatform(300,100,200,10);

		generatePlatform(0,0,10,600);
		generatePlatform(590,0,10,600);
		generatePlatform(0,0,600,10);
		generatePlatform(0,590,600,10);

	};
	/** @param m Movable - the object
	    @param p Movable - the platform
	    @return Integer - -1 if m's x is less, 0 if possible, 1 if greater
	 */
	that.collPossibleX = function(m, p){
		var mhw = m.getWidth()/2;//half width
		var phw = p.getWidth()/2;
		var mcx = m.getX() + mhw;//center x
		var pcx = p.getX() + phw;
		var sDiff = mcx - pcx; //signed difference
		var aDiff = Math.abs(sDiff);
		if(aDiff < mhw + phw + (Math.abs(m.getXVel()) * GM.game.delta) + 1){
			return 0;
		}
		else{
			if(sDiff < 0){
				return -1;
			}
			else{
				return 1;
			}
		}
	};
	that.collPossibleY = function(m, p){
		var mhh = m.getHeight()/2;//half width
		var phh = p.getHeight()/2;
		var mcy = m.getY() + mhh;//center x
		var pcy = p.getY() + phh;
		var sDiff = mcy - pcy; //signed difference
		var aDiff = Math.abs(sDiff);
		if(aDiff < mhh + phh + (Math.abs(m.getYVel()) * GM.game.delta) + 1){
			return 0;
		}
		else{
			if(sDiff < 0){
				return -1;
			}
			else{
				return 1;
			}
		}
	};

	that.attach = function(m, p){
		m.setY(p.getY() - p.getHeight() - m.getHeight());
	}
	
	that.destroy = function(){
		root = null;
		rear = null;
	};
	
	return that;
}());