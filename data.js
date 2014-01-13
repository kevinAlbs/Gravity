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
		{"platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":503,"y":184,"width":97,"height":10},{"x":503,"y":135,"width":97,"height":10},{"x":503,"y":194,"width":10,"height":100}],"kblocks":[{"x":156,"y":69,"width":443,"height":10,"hidden":false},{"x":156,"y":77,"width":10,"height":283,"hidden":false}],"laserguns":[],"dots":[{"x":211,"y":533},{"x":552,"y":237}],"playerX":41,"playerY":583,"end":{"x":588,"y":144,"width":11,"height":40}}
	]
}