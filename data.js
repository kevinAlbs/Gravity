//holds all of the in game data like dependencies and animations
GM.data = {
	//images/sound dependencies to be loaded before the game starts
	dependencies:[
		{
			type: 'img',
			name: 'spritesheet',
			src: 'images/spritesheet.png'
		},
		{
			type: 'sound',
			name: 'bg',
			src: 'sounds/bg.ogg'
		},
		{
			type: 'sound',
			name: 'bop',
			src: 'sounds/bop.wav'
		},
		{
			type: 'sound',
			name: 'death',
			src: 'sounds/death.wav'
		},
		{
			type: 'sound',
			name: 'levelEnd',
			src: 'sounds/levelEnd.wav'
		}
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
		Player: {
			idle: [
			{
				x: 0,
				y: 0,
				width: 16,
				height: 16,
				time: 100
			}
			],
			walking: [
			{
				x: 0,
				y: 0,
				width: 16,
				height: 16,
				time: 60
			},
			{
				x: 16,
				y: 0,
				width: 16,
				height: 16,
				time: 60
			},
			{
				x: 0,
				y: 0,
				width: 16,
				height: 16,
				time: 60
			},
			{
				x: 32,
				y: 0,
				width: 16,
				height: 16,
				time: 60
			}
			]
		}
	},
	stages:[
		/* tutorial stages start */
		{hudStat: "Remember, press space to restart", numGravSwitches: 5, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":159,"y":519,"width":100,"height":10},{"x":355,"y":450,"width":100,"height":10}],"kblocks":[],"laserguns":[],"dots":[{"x":405,"y":399}],"playerX":34,"playerY":578,"end":{"x":480,"y":567,"width":39,"height":32}},
		{hudStat: "It only gets harder", numGravSwitches: 5,"platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":55,"y":95,"width":100,"height":10},{"x":151,"y":357,"width":100,"height":10},{"x":326,"y":465,"width":41,"height":10},{"x":258,"y":534,"width":35,"height":10},{"x":265,"y":405,"width":40,"height":10},{"x":405,"y":403,"width":100,"height":10}],"kblocks":[{"x":165,"y":521,"width":10,"height":79,"hidden":false},{"x":385,"y":517,"width":10,"height":85,"hidden":false}],"laserguns":[],"dots":[{"x":188,"y":210},{"x":69,"y":549},{"x":271,"y":548},{"x":482,"y":544}],"playerX":94,"playerY":76,"end":{"x":440,"y":389,"width":24,"height":14}},
		{hudStat: "Think outside of the box, use your gravity switches.", numGravSwitches: 5,"platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600}],"kblocks":[{"x":0,"y":297,"width":69,"height":10,"hidden":false},{"x":286,"y":0,"width":10,"height":64,"hidden":false},{"x":419,"y":467,"width":10,"height":133,"hidden":false},{"x":473,"y":468,"width":10,"height":132,"hidden":false}],"laserguns":[],"dots":[{"x":28,"y":242},{"x":341,"y":24}],"playerX":249,"playerY":556,"end":{"x":437,"y":576,"width":28,"height":22}},
		{hudStat: "Not everything is as it seems", numGravSwitches: 3, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600}],"kblocks":[{"x":491,"y":443,"width":10,"height":114,"hidden":true},{"x":500,"y":547,"width":100,"height":10,"hidden":true}],"laserguns":[{"x":2,"y":293,"dx":98,"dy":-38,"timeOn":1000,"timeOff":1000},{"x":1,"y":156,"dx":95,"dy":21,"timeOn":1000,"timeOff":1000}],"dots":[{"x":242,"y":514}],"playerX":49,"playerY":574,"end":{"x":517,"y":492,"width":68,"height":36}},

		{hudStat: "Your gravity switches are limited", numGravSwitches: 6, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":503,"y":184,"width":97,"height":10},{"x":503,"y":135,"width":97,"height":10},{"x":503,"y":194,"width":10,"height":100}],"kblocks":[{"x":156,"y":69,"width":443,"height":10,"hidden":false},{"x":156,"y":77,"width":10,"height":423,"hidden":true}],"laserguns":[{"x":262,"y":256,"dx":229,"dy":1,"timeOn":1000,"timeOff":2000}],"dots":[{"x":211,"y":533},{"x":552,"y":237},{"x":63,"y":222}],"playerX":41,"playerY":583,"end":{"x":588,"y":144,"width":11,"height":40}},
		{hudStat: "Fortunately, deaths are unlimited", numGravSwitches: 4, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":443,"y":132,"width":37,"height":10},{"x":11,"y":561,"width":100,"height":10},{"x":442,"y":97,"width":10,"height":45},{"x":209,"y":466,"width":44,"height":10},{"x":324,"y":384,"width":44,"height":10},{"x":21,"y":136,"width":78,"height":10},{"x":20,"y":77,"width":10,"height":69}],"kblocks":[{"x":0,"y":590,"width":600,"height":10,"hidden":false},{"x":590,"y":0,"width":10,"height":600,"hidden":false},{"x":0,"y":0,"width":10,"height":599,"hidden":false},{"x":4,"y":0,"width":596,"height":10,"hidden":false}],"laserguns":[{"x":263,"y":19,"dx":0,"dy":75,"timeOn":1000,"timeOff":1000}],"dots":[{"x":461,"y":111},{"x":57,"y":107}],"playerX":56,"playerY":543,"end":{"x":47,"y":538,"width":32,"height":17}},
		//maze (not terribly difficult, but need to use all 3 switches)
		{hudStat: "Waste not", numGravSwitches: 3, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":22,"y":21,"width":12,"height":495},{"x":0,"y":581,"width":574,"height":10},{"x":109,"y":71,"width":465,"height":10},{"x":574,"y":21,"width":12,"height":570},{"x":34,"y":506,"width":282,"height":10},{"x":315,"y":506,"width":10,"height":48},{"x":325,"y":544,"width":190,"height":10},{"x":474,"y":439,"width":100,"height":10},{"x":474,"y":357,"width":10,"height":82},{"x":320,"y":118,"width":255,"height":10},{"x":384,"y":348,"width":100,"height":10},{"x":57,"y":456,"width":78,"height":10},{"x":135,"y":456,"width":10,"height":50},{"x":57,"y":344,"width":213,"height":10},{"x":474,"y":313,"width":100,"height":10},{"x":57,"y":354,"width":10,"height":102},{"x":238,"y":271,"width":306,"height":10},{"x":238,"y":199,"width":100,"height":10},{"x":68,"y":151,"width":100,"height":10},{"x":238,"y":209,"width":10,"height":62},{"x":363,"y":146,"width":12,"height":125}],"kblocks":[{"x":342,"y":472,"width":121,"height":10,"hidden":false},{"x":22,"y":11,"width":564,"height":10,"hidden":false}],"laserguns":[],"dots":[{"x":274,"y":234},{"x":110,"y":190},{"x":94,"y":483},{"x":521,"y":393},{"x":543,"y":97}],"playerX":25,"playerY":538,"end":{"x":564,"y":25,"width":10,"height":45}},
		{hudStat: "Quick and light", numGravSwitches: 6,"platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":53,"y":45,"width":547,"height":10},{"x":53,"y":52,"width":10,"height":185},{"x":141,"y":161,"width":224,"height":10},{"x":524,"y":159,"width":10,"height":100}],"kblocks":[{"x":133,"y":226,"width":100,"height":10,"hidden":false},{"x":132,"y":94,"width":10,"height":141,"hidden":false}],"laserguns":[{"x":1,"y":19,"dx":97,"dy":0,"timeOn":1000,"timeOff":1000},{"x":526,"y":83,"dx":-167,"dy":-1,"timeOn":1000,"timeOff":750},{"x":36,"y":5,"dx":0,"dy":71,"timeOn":1000,"timeOff":1000}],"dots":[{"x":288,"y":5},{"x":95,"y":169},{"x":243,"y":131},{"x":184,"y":195}],"playerX":549,"playerY":26,"end":{"x":328,"y":408,"width":29,"height":15}},
		//can do it in 5
		{hudStat: "Sometimes there is more than one way", numGravSwitches: 6, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":109,"y":82,"width":10,"height":100},{"x":0,"y":430,"width":478,"height":10},{"x":350,"y":94,"width":10,"height":265},{"x":468,"y":95,"width":10,"height":342}],"kblocks":[{"x":0,"y":86,"width":10,"height":344,"hidden":false},{"x":215,"y":0,"width":10,"height":360,"hidden":false},{"x":237,"y":213,"width":100,"height":10,"hidden":true}],"laserguns":[{"x":578,"y":46,"dx":-75,"dy":-2,"timeOn":1000,"timeOff":2000}],"dots":[{"x":38,"y":136},{"x":173,"y":137}],"playerX":106,"playerY":32,"end":{"x":286,"y":501,"width":48,"height":46}},
		//a breather
		{hudStat: "Tread carefully", numGravSwitches: 1, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600}],"kblocks":[{"x":261,"y":540,"width":10,"height":59,"hidden":false},{"x":461,"y":481,"width":100,"height":10,"hidden":false},{"x":565,"y":374,"width":35,"height":10,"hidden":false}],"laserguns":[{"x":25,"y":10,"dx":60,"dy":19,"timeOn":1000,"timeOff":1000},{"x":13,"y":14,"dx":14,"dy":46,"timeOn":1000,"timeOff":1000},{"x":202,"y":21,"dx":-3,"dy":27,"timeOn":1000,"timeOff":1000},{"x":302,"y":24,"dx":2,"dy":30,"timeOn":1000,"timeOff":1000},{"x":402,"y":22,"dx":-2,"dy":35,"timeOn":1000,"timeOff":1000},{"x":18,"y":112,"dx":31,"dy":1,"timeOn":750,"timeOff":500},{"x":14,"y":151,"dx":34,"dy":5,"timeOn":750,"timeOff":1000}],"dots":[{"x":159,"y":573},{"x":356,"y":573}],"playerX":41,"playerY":551,"end":{"x":544,"y":17,"width":28,"height":27}},
		//somewhat difficult (but still not last)
		{hudStat: "Leap of faith", numGravSwitches: 5, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":41,"width":100,"height":10},{"x":433,"y":462,"width":100,"height":10}],"kblocks":[{"x":171,"y":0,"width":429,"height":10,"hidden":false},{"x":97,"y":87,"width":285,"height":10,"hidden":false},{"x":89,"y":52,"width":10,"height":45,"hidden":false},{"x":590,"y":7,"width":10,"height":584,"hidden":false},{"x":374,"y":88,"width":10,"height":301,"hidden":false},{"x":0,"y":589,"width":600,"height":10,"hidden":false},{"x":0,"y":167,"width":10,"height":424,"hidden":false}],"laserguns":[{"x":341,"y":126,"dx":-32,"dy":30,"timeOn":3000,"timeOff":3000}],"dots":[{"x":313,"y":42},{"x":428,"y":122},{"x":500,"y":229},{"x":457,"y":344},{"x":481,"y":559}],"playerX":20,"playerY":22,"end":{"x":3,"y":53,"width":26,"height":29}},
		//slight troll, but breather
		{hudStat: "You wish", numGravSwitches: 4, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":48,"y":104,"width":524,"height":10}],"kblocks":[{"x":248,"y":65,"width":10,"height":39,"hidden":false},{"x":248,"y":0,"width":10,"height":66,"hidden":true},{"x":248,"y":114,"width":10,"height":265,"hidden":true},{"x":0,"y":590,"width":600,"height":10,"hidden":true}],"laserguns":[],"dots":[{"x":294,"y":78}],"playerX":63,"playerY":87,"end":{"x":533,"y":65,"width":27,"height":24}},
		//difficult (but not last level)
		{hudStat: "Almost there", numGravSwitches: 5, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":33,"y":215,"width":10,"height":384},{"x":33,"y":206,"width":205,"height":10},{"x":316,"y":206,"width":287,"height":10}],"kblocks":[{"x":249,"y":304,"width":64,"height":10,"hidden":false},{"x":242,"y":304,"width":10,"height":78,"hidden":false},{"x":0,"y":1,"width":600,"height":10,"hidden":true},{"x":437,"y":148,"width":10,"height":58,"hidden":false},{"x":517,"y":111,"width":10,"height":95,"hidden":false},{"x":43,"y":590,"width":557,"height":10,"hidden":false},{"x":590,"y":216,"width":10,"height":378,"hidden":false}],"laserguns":[{"x":153,"y":13,"dx":44,"dy":38,"timeOn":1000,"timeOff":1000},{"x":399,"y":11,"dx":-40,"dy":33,"timeOn":1500,"timeOff":750}],"dots":[{"x":476,"y":171},{"x":559,"y":148}],"playerX":4,"playerY":583,"end":{"x":267,"y":331,"width":35,"height":35}},
		//I think this is good for last
		{hudStat: "This is it.", numGravSwitches: 10, "platforms":[{"x":0,"y":0,"width":600,"height":1},{"x":0,"y":0,"width":1,"height":600},{"x":0,"y":599,"width":600,"height":1},{"x":599,"y":0,"width":1,"height":600},{"x":526,"y":567,"width":46,"height":10},{"x":371,"y":97,"width":100,"height":10},{"x":371,"y":75,"width":10,"height":31},{"x":123,"y":76,"width":10,"height":202},{"x":0,"y":590,"width":118,"height":10}],"kblocks":[{"x":116,"y":590,"width":484,"height":10,"hidden":false},{"x":590,"y":1,"width":9,"height":599,"hidden":false},{"x":0,"y":0,"width":600,"height":10,"hidden":false},{"x":0,"y":7,"width":10,"height":583,"hidden":false},{"x":72,"y":473,"width":10,"height":66,"hidden":false},{"x":72,"y":467,"width":82,"height":10,"hidden":false},{"x":332,"y":274,"width":152,"height":10,"hidden":true},{"x":133,"y":76,"width":10,"height":202,"hidden":false},{"x":123,"y":274,"width":212,"height":10,"hidden":false},{"x":325,"y":279,"width":10,"height":160,"hidden":false},{"x":71,"y":429,"width":262,"height":10,"hidden":false},{"x":0,"y":353,"width":238,"height":10,"hidden":false},{"x":74,"y":530,"width":324,"height":10,"hidden":false},{"x":389,"y":531,"width":10,"height":62,"hidden":false},{"x":253,"y":570,"width":10,"height":28,"hidden":false}],"laserguns":[{"x":146,"y":535,"dx":0,"dy":29,"timeOn":1000,"timeOff":2000},{"x":384,"y":553,"dx":-54,"dy":0,"timeOn":1000,"timeOff":2000}],"dots":[{"x":411,"y":503},{"x":114,"y":503},{"x":69,"y":99},{"x":410,"y":64}],"playerX":541,"playerY":549,"end":{"x":351,"y":548,"width":27,"height":28}}
	]
}

