//holds all of the in game data like dependencies and animations
GM.data = {
	//images/sound dependencies to be loaded before the game starts
	dependencies:[
		/*
		{
			type: 'img',
			name: 'spritesheet',
			src: 'images/spritesheet.gif'
		},
		{
			type: 'sound',
			name: 'shot1',
			src: 'sounds/shotgun2.wav'
		},
		*/
	],
	//all of the animation data for the locations/times on spritesheet
	animation_sets:{
	},
	stages:[
		//might be stupidly easy
		{numGravSwitches: 5, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":503,"y":184,"width":97,"height":10},{"x":503,"y":135,"width":97,"height":10},{"x":503,"y":194,"width":10,"height":100}],"kblocks":[{"x":156,"y":69,"width":443,"height":10,"hidden":false},{"x":156,"y":77,"width":10,"height":283,"hidden":true}],"laserguns":[{"x":262,"y":256,"dx":229,"dy":1,"timeOn":1000,"timeOff":2000}],"dots":[{"x":211,"y":533},{"x":552,"y":237}],"playerX":41,"playerY":583,"end":{"x":588,"y":144,"width":11,"height":40}},
		//maze (not terribly difficult, but need to use all 3 switches)
		{numGravSwitches: 3, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":22,"y":21,"width":12,"height":495},{"x":0,"y":581,"width":574,"height":10},{"x":109,"y":71,"width":465,"height":10},{"x":574,"y":21,"width":12,"height":570},{"x":34,"y":506,"width":282,"height":10},{"x":315,"y":506,"width":10,"height":48},{"x":325,"y":544,"width":190,"height":10},{"x":474,"y":439,"width":100,"height":10},{"x":474,"y":357,"width":10,"height":82},{"x":320,"y":118,"width":255,"height":10},{"x":384,"y":348,"width":100,"height":10},{"x":57,"y":456,"width":78,"height":10},{"x":135,"y":456,"width":10,"height":50},{"x":57,"y":344,"width":213,"height":10},{"x":474,"y":313,"width":100,"height":10},{"x":57,"y":354,"width":10,"height":102},{"x":238,"y":271,"width":306,"height":10},{"x":238,"y":199,"width":100,"height":10},{"x":68,"y":151,"width":100,"height":10},{"x":238,"y":209,"width":10,"height":62},{"x":363,"y":146,"width":12,"height":125}],"kblocks":[{"x":342,"y":472,"width":121,"height":10,"hidden":false},{"x":22,"y":11,"width":564,"height":10,"hidden":false}],"laserguns":[],"dots":[{"x":274,"y":234},{"x":110,"y":190},{"x":94,"y":483},{"x":521,"y":393},{"x":543,"y":97}],"playerX":25,"playerY":538,"end":{"x":564,"y":25,"width":10,"height":45}},
		//difficult (but not last level)
		{numGravSwitches: 5, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":33,"y":215,"width":10,"height":384},{"x":33,"y":206,"width":205,"height":10},{"x":316,"y":206,"width":287,"height":10}],"kblocks":[{"x":249,"y":304,"width":64,"height":10,"hidden":false},{"x":242,"y":304,"width":10,"height":78,"hidden":false},{"x":0,"y":1,"width":600,"height":10,"hidden":true},{"x":437,"y":148,"width":10,"height":58,"hidden":false},{"x":517,"y":111,"width":10,"height":95,"hidden":false},{"x":43,"y":590,"width":557,"height":10,"hidden":false},{"x":590,"y":216,"width":10,"height":378,"hidden":false}],"laserguns":[{"x":180,"y":38,"dx":44,"dy":38,"timeOn":1000,"timeOff":1000},{"x":363,"y":38,"dx":-40,"dy":33,"timeOn":1500,"timeOff":750}],"dots":[{"x":476,"y":171},{"x":559,"y":148}],"playerX":4,"playerY":583,"end":{"x":267,"y":331,"width":35,"height":35}}
	]
}

