var Map = Class.extend({
	init: function ( e, name ) {
		this.Engine = e;
		this.Name = name;
		this.BasePosition = new Vector2D(0, 0);
		this.Layers = []
		this.AnimationManager = new TileAnimationManager(e);
		this.TileCount = 0;
		
		this.NightTimeIndex = 0.7;
		
		this.Terrain;
		this.Objects;
		this.Overlay;
	},
	Load: function () {
		this.Terrain = this.Engine.Renderer.GetImage("GameMapTerrain");
		this.Objects = this.Engine.Renderer.GetImage("GameMapObjects");
		this.Overlay = this.Engine.Renderer.GetImage("GameMapOverlay");
		
		this.GetMapDataFromServer();
		
		return this;
	},
	GetMapDataFromServer: function () {
		// Let's say we had a server...
		
		for(var CurrentLayer in MapLayers) {
			this.Layers[CurrentLayer] = []
		}
		
		this.Layers[MapLayers.Terrain] = PopulateWithTerrain(this, this.Engine.Viewport.X, this.Engine.Viewport.Y);
		this.Layers[MapLayers.Objects] = PopulateWithObjects(this, this.Engine.Viewport.X, this.Engine.Viewport.Y);
		this.Layers[MapLayers.Overlay] = PopulateWithOverlays(this, this.Engine.Viewport.X, this.Engine.Viewport.Y);
	},
	DrawBottomLayers: function () {
		var CameraOffset = (new Vector2D( (this.BasePosition.X) * -1, (this.BasePosition.Y) * -1 ));
		
		for(var X = (0 + CameraOffset.X); X < (this.Engine.Viewport.X + CameraOffset.X); X++) {
			for(var Y = (0 + CameraOffset.Y); Y < (this.Engine.Viewport.Y + CameraOffset.Y); Y++) {
				if (this.Layers[MapLayers.Terrain][X] && this.Layers[MapLayers.Terrain][X][Y] && LayerOne) {
					this.Layers[MapLayers.Terrain][X][Y].Draw();
				}
				
				if (this.Layers[MapLayers.Objects][X] && this.Layers[MapLayers.Objects][X][Y] && LayerTwo) {
					this.Layers[MapLayers.Objects][X][Y].Draw();
				}
			}
		}
	},
	GetImageFromLayer: function ( l ) {
		switch(l) {
			case MapLayers.Terrain:
				return this.Terrain;
				break;
			case MapLayers.Objects:
				return this.Objects;
				break;
			case MapLayers.Overlay:
				return this.Overlay;
				break;
			default:
				break;
		}
	},
	Process: function () {

		if (this.Engine.Input.Keyboard.GetKey(51)) {
			LayerOne = !LayerOne;
		}
		if (this.Engine.Input.Keyboard.GetKey(52)) {
			LayerTwo = !LayerTwo;
		}
		if (this.Engine.Input.Keyboard.GetKey(53)) {
			LayerThree = !LayerThree;
		}
		
		this.DrawBottomLayers();
		
		this.DrawOverlays();
		
		//this.NightTimeIndex += 0.0025;
		
		//this.DrawTime();
		
		this.AnimationManager.Update();
	},
	DrawOverlays: function () {
		var CameraOffset = (new Vector2D( (this.BasePosition.X) * -1, (this.BasePosition.Y) * -1 ));
		
		for(var X = (0 + CameraOffset.X); X < (this.Engine.Viewport.X + CameraOffset.X); X++) {
			for(var Y = (0 + CameraOffset.Y); Y < (this.Engine.Viewport.Y + CameraOffset.Y); Y++) {
				if (this.Layers[MapLayers.Overlay][X] && this.Layers[MapLayers.Overlay][X][Y] && LayerThree) {
					this.Layers[MapLayers.Overlay][X][Y].Draw();
					
				}
			}
		}
	},
	AdjustTime: function () {
		
	},
	DrawTime: function () {
		var CX = this.Engine.Renderer.GetContext();
		
		this.AdjustTime();
	
		CX.beginPath();
		CX.rect(0, 0, this.Engine.O.width, this.Engine.O.height);
		CX.fillStyle = 'rgba(19, 23, 72, '+this.NightTimeIndex+')';
		CX.fill();
	}
});

var MapLayers = {
	Terrain: 0,
	Objects: 1,
	Overlay: 2
};