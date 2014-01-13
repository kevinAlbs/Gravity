function WinScreen(nextScreen){
	/* screen methods */
	this.init = function(){
	};
	this.show = function(){
		document.getElementById("screen-win").style.display = "block";
	};
	this.hide = function(){
		document.getElementById("screen-win").style.display = "none";
	};
};
GM.utils.inherits(WinScreen, Screen);