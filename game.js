	
/*
 * @class game
 * singleton
 * contains game logic
 * acts as mediator for all game classes
 */
GM.game = (function(){
	var that = {};
	that.debug = {
		noDie : true
	};
	that.delta = 0;	
	var	paused= false, //if true, it will still update, but not run anything
		movementPaused = false,//used for cutscenes, stops user movment
		started= false, //if false it won't keep updating, set to true on the first init
		timer= null,
		fps= 30,
		curFPS = 0,
		cWidth, // canvas width
		cHeight,
		mapWidth, //map width (in tens)
		ctx,
		ctxout,
		keys= {
			w: false,
			a: false,
			s: false,
			dk: false, //d key (d taken)
			l: false, //left
			r: false, //right
			u: false,
			d: false,
			sp: false, //space,
			restart: false
		},
		mouse = {
			pressed: false,
			x: cWidth,
			y: cHeight/2
		},
		player = null,
		playerDead = false;

	var gravSwitch = 3; //Gravity is either 1 (up), 2(right), 3(down), or 4(left). Default is down.
	var gravSwitchLock = false;

	function switchKeys(e, val){
		var key = e.which;
		switch(key){
			case 32:
			keys.restart = val;
			e.preventDefault();
			break;

			case 87:
			keys.w = val;
			e.preventDefault();
			break;

			case 83:
			keys.s = val;
			e.preventDefault();
			break;

			case 65:
			keys.a = val;
			e.preventDefault();
			break;

			case 68:
			keys.dk = val;
			e.preventDefault();
			break;

			case 39:
			keys.r = val;
			e.preventDefault();
			break;

			case 37:
			keys.l = val;
			e.preventDefault();
			break;

			case 38:
			keys.u = val;
			e.preventDefault();
			break;

			case 40:
			keys.d = val;
			e.preventDefault();
			break;

			case 32:
			keys.sp = val;
			e.preventDefault();
			break;
		}
	}
	function handleKeyDown(e){
	//	console.log(e.which);
		switchKeys(e, true);
	}

	function handleKeyUp(e){
		switchKeys(e, false);
	}
	function handleMousemove(e){
		mouse.x = e.layerX;
		mouse.y = e.layerY;
	}
	function handleMousedown(e){
		mouse.pressed = true;
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
	function handleMouseup(){
		mouse.pressed = false;
	}

	//data is exported object from builder
	function buildFromData(data){
		GM.platformList.importPlatforms(data.platforms);
	}


	function init(){
		var cnv = document.getElementById("mycanvas");
		ctx = cnv.getContext("2d");
		ctx.strokeStyle = "#00F";

		//ctx.webkitImageSmoothingEnabled = false;
		cWidth = cnv.width;
		cHeight = cnv.height;
		playerDead = false;
		won = false;

		if(GM.data.hasOwnProperty("builder")){
			//builder debugging, import data
			buildFromData(GM.data.builder.output);
			player = new Player();
			player.setX(GM.data.builder.output.playerX);
			player.setY(GM.data.builder.output.playerY);
		}
		else{
			GM.platformList.generatePlatforms(10);
			GM.objectList.generateObjects();
			player = new Player();
		}

		GM.viewport.init(cWidth, cHeight, mapWidth);
		that.p = player;
		paused = false;
		started = true;
		requestAnimationFrame(update);//start updating process
	}

	//called to clean up objects/listeners before restarting
	//this can safely be called even if the game is already destroyed
	function destroy(){
		paused = true;
		player = null;
		GM.platformList.destroy();
		GM.objectList.destroy();
	}

	function switchGravity(val){
		if(gravSwitchLock != false){return;}
		gravSwitchLock = val;//only this val will unlock
		gravSwitch = val;
		if(val == 1){
			//up
			player.setGrav(0,-.00134);
		}
		else if(val == 2){
			player.setGrav(.00134, 0);
		}
		else if(val == 3){
			player.setGrav(0,.00134);
		}
		else if(val == 4){
			//left
			player.setGrav(-.00134, 0);
		}
	}
	function unlockSwitchGrav(val){
		if(val == gravSwitchLock){
			gravSwitchLock = false;
		}
	}
	var d = new Date();
	var ticks = 0;
	var timeCount = 0;
	var prevTime = null;

	function update(timestamp){
		if(playerDead){
			//check if they are pressing r
			if(keys.restart){
				that.startGame();
			}
		}
		if(prevTime == null || paused){
			//continue to update, but do nothing
			prevTime =  timestamp;
			requestAnimationFrame(update);
			return;
		}

		var newTime = timestamp;
		GM.game.delta = newTime - prevTime;
		prevTime = newTime;


		var movementDebug = true;
		var flip = 1;
		if(gravSwitch == 2){
			flip = -1;
		}
		if(!movementPaused){
			if(keys.r){
				player.movePerp(1 * flip);
			}
			else if(keys.l){
				player.movePerp(-1 * flip);
			}
			else{
				player.unMovePerp();
			}
			if(keys.u){
				player.jump();
			}
			else{
				player.unjump();
			}
			if(keys.w){
				switchGravity(1);
			}
			else{
				unlockSwitchGrav(1);
			}
			if(keys.a){
				switchGravity(4);
			}
			else{
				unlockSwitchGrav(4);
			}
			if(keys.dk){
				switchGravity(2);
			}
			else{
				unlockSwitchGrav(2);
			}
			if(keys.s){
				switchGravity(3);
			}
			else{
				unlockSwitchGrav(3);
			}
		}
		else{
			player.movePerp(0);//no moving during cutscenes!
		}
		//update everything
		player.update();
		GM.viewport.update(player.getX(), player.getY());
		GM.objectList.update();
		paint();
		
		//now that update has run, set all key presses to false
		keys.zp = false;

		var kb = GM.objectList.collidingKBlocks(player);
		if(kb != null){
			//walk into a killer block, get killed fool
			that.playerDies();
			kb.setHidden(false);
		}
		GM.objectList.checkDotCollisions(player);
		GM.particleList.update();
		
		ticks++;
		var now = new Date().getTime();
		timeCount += now - prevTime;
		if(timeCount > 1000){
			curFPS = ticks;
			ticks = 0;
			timeCount = 0;
		}

		
		requestAnimationFrame(update);
	};
	
	function paint(){
		ctx.save();
		ctx.clearRect(0,0,cWidth, cHeight);
		if(gravSwitch == 1){
			//ctx.translate(0,cHeight);
			//ctx.scale(1,-1);
		}
		else{
		}

		GM.viewport.paint(ctx);
		//paint player
		player.paint(ctx);
		GM.platformList.paint(ctx);
		GM.objectList.paint(ctx);
		GM.particleList.paint(ctx);
		ctx.restore();

	};

	/* public methods */
	/* deps is defined as an array of objects describing media type:
	[{
		type: 'img',
		src: 'filepath.jpg',
		name: 'spritesheet'
	}]
	name is final name in GM.deps
	*/
	that.loadDependencies = function(deps, callback){
		var total = deps.length, loadedTotal = 0;
		GM.deps = {};
		function loaded(){
			loadedTotal++;
			if(loadedTotal >= total){
				//finished loading all dependencies
				callback.call(window);
			}
		}
		if(deps.length == 0){
			loaded();
		}
		//load each one
		for(var i = 0; i < deps.length; i++){
			switch(deps[i].type){
				case "img":
					//load image
					var img = new Image();
					img.onload = loaded;
					img.src = deps[i].src;
					GM.deps[deps[i].name] = img;
				break;
				case "sound":
					var aud = new Audio();
					aud.preload = "auto";
					aud.addEventListener("canplaythrough", loaded, true);
					aud.src = deps[i].src;
					GM.deps[deps[i].name] = aud;
				break;
			}
		}
	};

	//add or remove all listeners
	that.toggleListeners = function(val){
		var fn = val + "EventListener";
		var cnv = document.getElementById("mycanvas");
		document[fn]("keydown",handleKeyDown, false);
		document[fn]("keyup",handleKeyUp, false);
		cnv[fn]("mousedown", handleMousedown, false);
		cnv[fn]("mouseup", handleMouseup, false);
		cnv[fn]("mousemove", handleMousemove, false);
	};

	that.startGame = function(){
		console.log("Game started");
		destroy();
		init();
	};

	that.getGravSwitch = function(){return gravSwitch;};
	that.getXOffset = function(){
		return GM.viewport.getXOffset();
	};

	that.getCHeight = function(){return cHeight;}
	that.getCWidth = function(){return cWidth;}
	that.getMapWidth = function(){return mapWidth * 10;}
	that.inScreen = function(obj){
		return GM.viewport.inScreen(obj);
	}
	that.getPlayerWalking = function(){return player.getWalkingSpeed();};
	that.getPlayerXVel = function(){return player.getXVel();}
	that.getPlayerX = function(){return player.getX();};
	that.getPlayerY = function(){return player.getY();};
	that.getPlayerPlatform = function(){return player.whichPlatform();};
	that.getPlayerWidth = function(){return player.getWidth();};
	that.getPlayerHeight = function(){return player.getHeight();};
	that.generateParticles = function(stg){
		//to be implemented
		GM.particleList.generateParticles(stg);	
	};

	that.playerDies = function(){
		if(that.debug.noDie){return;}
		if(!player.isDead()){
			player.getKilled();
		}
	};

	that.handlePlayerDeath = function(){
		paused = true;
		playerDead = true;
		hudStat = "PRESS SPACE TO RESTART";
	};

	return that;
}());
