function LoadingScreen(nextScreen){
	/* screen methods */
	this.init = function(){
		GM.game.loadDependencies(GM.data.dependencies, function(){
			GM.deps.bg.addEventListener("ended", function(){
				this.currentTime = 0;
				this.play();
			}, false);
			GM.deps.bg.play();
			console.log("Switching screen from loading screen");
			if(nextScreen){
				GM.switchScreen(nextScreen);
			}
			else{
				GM.switchScreen(new GameScreen());	
			}
		});
	};
	this.show = function(){
		document.getElementById("screen-loading").style.display = "block";
	};
	this.hide = function(){
		document.getElementById("screen-loading").style.display = "none";
	};
};
GM.utils.inherits(LoadingScreen, Screen);