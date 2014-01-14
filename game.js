	
/*
 * @class game
 * singleton
 * contains game logic
 * acts as mediator for all game classes
 */
GM.game = (function(){
	var that = {};
	that.debug = {
		noDie : !false,
		stageTest: true
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
		playerDead = false,
		stageEnd = false,
		numGravSwitches = 100,
		restartLock = false,
		deathCount = 0,
		hudStat = "",
		hud = {
			gravitySwitches: document.getElementById("grav_switch_amt"),
			stage: document.getElementById("stage"),
			status: document.getElementById("status"),
			deathCount: document.getElementById("death_count"),
			deathCountFinal: document.getElementById("final_death_count")
		},
		current_stage = 0,
		transition_size = 0;
	var gravSwitch = 3; //Gravity is either 1 (up), 2(right), 3(down), or 4(left). Default is down.
	var gravSwitchLock = false;
	var d = new Date();
	var ticks = 0;
	var timeCount = 0;
	var prevTime = null;

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
		console.log(e.which);
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
		GM.objectList.importObjects(data);
	}


	function init(){
		var cnv = document.getElementById("mycanvas");
		ctx = cnv.getContext("2d");
		ctx.strokeStyle = "#00F";

		//ctx.webkitImageSmoothingEnabled = false;
		cWidth = cnv.width;
		cHeight = cnv.height;
		playerDead = false;
		stageEnd = false;
		won = false;
		transition_size = 0;

		/* load data for this stage */
		if(that.debug.stageTest){
			if(current_stage < 0 || current_stage > GM.data.stages.length){
				alert("Looks like we've got a hacker on our hands!");
				return;
			}
			else{
				var sData = GM.data.stages[current_stage];
				hudStat = sData.hudStat || "";
				numGravSwitches = sData.numGravSwitches;
				console.log(sData);
				buildFromData(sData);
				player = new Player();
				player.setX(sData.playerX);
				player.setY(sData.playerY);
			}
		}
		else{
			if(GM.data.hasOwnProperty("builder")){
				//builder debugging, import data
				numGravSwitches = 100;
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
		}
		GM.viewport.init(cWidth, cHeight, mapWidth);
		that.p = player;
		paused = false;
		if(!started){
			requestAnimationFrame(update);//start updating process
		}
		started = true;
		gravSwitch = 3;
		gravSwitchLock = false;

		that.updateHUD();

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
		if(numGravSwitches <= 0){return;}
		if(player.isDead()){return;}
		gravSwitchLock = val;//only this val will unlock
		gravSwitch = val;
		numGravSwitches--;
		var ang = 0, angVar = Math.PI;
		if(val == 1){
			//up
			ang = 3 * Math.PI/2;
			player.setGrav(0,-.00124);
		}
		else if(val == 2){
			ang = Math.PI;
			player.setGrav(.00124, 0);
		}
		else if(val == 3){
			ang = Math.PI/2;
			player.setGrav(0,.00124);
		}
		else if(val == 4){
			//left
			ang = 0;
			player.setGrav(-.00124, 0);
		}
		//show some magical dust
		that.generateParticles({
			x: player.getX() + player.getWidth()/2,
			y: player.getY() + player.getHeight()/2,
			angle: ang,
			angle_variance: angVar,
			init_speed_x_variance: .1,
			init_speed_y_variance: .2,
			num: 5,
			color: "#00FF1E"
		});
		that.updateHUD();
	}
	function unlockSwitchGrav(val){
		if(val == gravSwitchLock){
			gravSwitchLock = false;
		}
	}


	function update(timestamp){
		
		
		if(prevTime == null || paused){
			//continue to update, but do nothing
			prevTime =  timestamp;
			requestAnimationFrame(update);
			return;
		}

		var newTime = timestamp;
		GM.game.delta = newTime - prevTime;
		prevTime = newTime;

		if(stageEnd){
			//show transition, nothing else
			transition_size += .5 * GM.game.delta;
			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(player.getX() + player.getWidth()/2, player.getY() + player.getHeight()/2, transition_size, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
			if(transition_size > 1500){
				//start next stage
				current_stage++;
				if(current_stage >= GM.data.stages.length){
					//this person won
					GM.switchScreen(new WinScreen());
					return;
				}
				//if this was the last stage, go to the winning screen
				that.startGame();
			}
			requestAnimationFrame(update);
			return;
		}

		//check if they are pressing space
		if(keys.restart){
			if(!restartLock){
				restartLock = true;
				if(!player.isDead()){
					deathCount++;
				}
				that.startGame();
				console.log("Starting game");
			}
		}
		else{
			restartLock = false;
		}

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
		if(!player.isDead()){
			if(GM.objectList.checkEndBlockCollision(player) && !stageEnd){
				//also checks if end of stage
				stageEnd = true;
				GM.deps.levelEnd.play();
			}
			var kb = GM.objectList.collidingKBlocks(player);
			if(kb != null){
				//walk into a killer block, get killed fool
				that.playerDies();
				kb.setHidden(false);
			}
			if(GM.objectList.checkDotCollisions(player)){
				if(GM.objectList.getNumDots() == 0){
					//show end platform
					GM.objectList.noMoreDots();
				}
			}
		}
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
		GM.viewport.paint(ctx);
		//paint player
		
		GM.platformList.paint(ctx);
		GM.objectList.paint(ctx);
		player.paint(ctx);
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
		console.log("Stage started");
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
			deathCount++;
			GM.deps.death.play();
			player.getKilled();
			that.updateHUD();
		}
	};

	that.handlePlayerDeath = function(){
		paused = true;
		playerDead = true;
		hudStat = "PRESS SPACE TO RESTART";
	};

	that.updateHUD = function(){
		hud.stage.innerHTML = (current_stage+1);
		hud.status.innerHTML = hudStat;
		hud.deathCount.innerHTML = deathCount;
		hud.gravitySwitches.innerHTML = numGravSwitches;
		hud.deathCountFinal.innerHTML = deathCount;
	}

	return that;
}());
