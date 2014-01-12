//methods for moving viewport and painting background
GM.viewport = (function(){
	var that = {};
	var xOffset = 0; //always positive

	var cWidth, cHeight, mapWidth;
	var leftMin = 0, rightMax = 0;//left/right bounds in pixels

	function updateOffsets(x,y){
		xOffset = 0;
		return;
		//to center x:
		xOffset = (x - cWidth / 5);
		if(xOffset < leftMin){
			xOffset = leftMin;
		}
		var rightBound = (rightMax - cWidth);
		if(xOffset > rightBound){
			xOffset = rightBound;
		}

	};

	that.init = function(cW, cH, mW){
	
		xOffset = 0;
		leftMin = 0;
		rightMax = 0;
		cWidth = cW;
		cHeight = cH;
		mapWidth = mW;
		rightMax = mapWidth * 10;
		
	};
	that.update = function(playerx, playery){
		updateOffsets(playerx, playery);	
	};
	that.paint = function(ctx){

	}
	that.getXOffset = function(){
		return xOffset;
	};

	//obj inherits Paintable
	that.inScreen = function(obj){
		return that.inScreenOverride(obj.getX(), obj.getWidth());
	};
	//not supplied object, but x and width instead (so far used for trees where "width" needs to include leaves)
	that.inScreenOverride = function(x,w){
		if(x + w > xOffset){
			if(x < xOffset + cWidth){
				return true;
			}	
		}
		return false;
	}

	return that;
}());
