var GlobalEngine;

var FPSLimit = 1000;
var FPSFilter = 50;

var Debug = false;

var WaterTest = false;

var LayerOne = true;
var LayerTwo = true;
var LayerThree = true;

var EngineResourcesCount = 0;
var EngineResourcesLoadedCount = 0;
var EngineResourcesLoaded = false;

function PopulateWithTerrain(m, x, y) {
	var localTileset = [];
	
	for(var X = 0; X < x; X++) {
		for(var Y = 0; Y < y; Y++) {
			if (!localTileset[X]) {
				localTileset[X] = [];
			}
			
			var currentTile = getRandomTile(Terrains);
			
			switch(currentTile.Type)
			{
				case "Static":
					localTileset[X][Y] = new Tile(m, MapLayers.Terrain, [X, Y], currentTile.Frames, 0);
					break;
					
				case "Animated":
					localTileset[X][Y] = new AnimatedTile(m, MapLayers.Terrain, [X, Y], currentTile.Frames, 0);
					m.AnimationManager.RegisterAnimatedTile(localTileset[X][Y]);
					break;
					
				default:
					break;
			}
			
			m.TileCount++;
		}
	}
	
	return localTileset;
}

function PopulateWithObjects(m, x, y) {
	var localTileset = [];
	
	for(var X = 0; X < x; X++) {
		for(var Y = 0; Y < y; Y++) {
			if (!localTileset[X]) {
				localTileset[X] = [];
			}
			
			//if ((X+Y) % 2) {
			
				var currentTile = getRandomTile(Objects);
				
				switch(currentTile.Type)
				{
					case "Static":
						localTileset[X][Y] = new Tile(m, MapLayers.Objects, [X, Y], currentTile.Frames, 0);
						break;
						
					case "Animated":
						localTileset[X][Y] = new AnimatedTile(m, MapLayers.Objects, [X, Y], currentTile.Frames, 0);
						m.AnimationManager.RegisterAnimatedTile(localTileset[X][Y]);
						break;
						
					default:
						break;
				}
			//}
			
			m.TileCount++;
		}
	}
	
	return localTileset;
}

function PopulateWithOverlays(m, x, y) {
	var localTileset = [];
	
	for(var X = 0; X < x; X++) {
		for(var Y = 0; Y < y; Y++) {
			if (!localTileset[X]) {
				localTileset[X] = [];
			}
			
			//if (((X+Y) % 2)) {
			
				var currentTile = getRandomTile(Overlays);
				
				switch(currentTile.Type)
				{
					case "Static":
						localTileset[X][Y] = new Tile(m, MapLayers.Overlay, [X, Y], currentTile.Frames, 0);
						break;
						
					case "Animated":
						localTileset[X][Y] = new AnimatedTile(m, MapLayers.Overlay, [X, Y], currentTile.Frames, 0);
						m.AnimationManager.RegisterAnimatedTile(localTileset[X][Y]);
						break;
						
					default:
						break;
				}
			//}
			
			m.TileCount++;
		}
	}
	
	return localTileset;
}

var Terrains = [
	{ Type: "Static", Frames: [0,0] },
	{ Type: "Static", Frames: [1,0] },
	{ Type: "Static", Frames: [0,1] },
	{ Type: "Static", Frames: [1,1] },
	{ Type: "Static", Frames: [0,2] },
	{ Type: "Static", Frames: [1,2] },
	{ Type: "Static", Frames: [4,4] },
	{ Type: "Animated", Frames: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9]] }
];

var Objects = [
	{ Type: "Animated", Frames: [[0,0],[1,0],[2,0],[3,0],[4,0]] },
	{ Type: "Animated", Frames: [[0,0],[1,0],[2,0],[3,0],[4,0]] }
];

var Overlays = [
	{ Type: "Static", Frames: [0,0] },
	{ Type: "Static", Frames: [0,0] },
	{ Type: "Static", Frames: [1,0] }
];

function getRandomTile(x)
{
	var rand = Math.floor((Math.random()*(x.length-1)))+1;
	
	return x[rand];
}

function popupGameClient() {
	open('test.htm', 'new', 'width=300,height=150,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
}

window.animationFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();