var HUD = Class.extend({
	init: function ( e ) {
		this.Engine = e;
		
		this.Show = true;
		this.CrosshairImage = false;
		this.FrameImage = false;
		
		this.Components = [];
		this.ComponentCount = 0;
		
		this.Load();
	},
	Load: function () {
		this.CrosshairImage = this.Engine.Renderer.GetImage("HUDCrosshair");
		this.FrameImage = this.Engine.Renderer.GetImage("HUDFrames");
		
		this.AddComponent(new HUDCrosshair(this.Engine));
		
		this.AddComponent(new Window(this.Engine, true, new Vector2D(2, 2), new Vector2D(23, 2)));
		this.AddComponent(new Window(this.Engine, true, new Vector2D(2, 35), new Vector2D(23, 8)));
		this.AddComponent(new Window(this.Engine, true, new Vector2D(2, 117), new Vector2D(23, 8)));
		this.AddComponent(new Window(this.Engine, true, new Vector2D(2, 199), new Vector2D(23, 12)));
		
		//this.AddComponent(new Window(this.Engine, true, new Vector2D(230, 220), new Vector2D(23, 1)));
		
		//this.AddComponent(new Console(this.Engine));
	},
	AddComponent: function ( c )  {
		this.Components[this.ComponentCount] = c;
		this.ComponentCount++;
	},
	Draw: function () {
		var CX = this.Engine.Renderer.GetContext();
		
		for(var i in this.Components) {
			this.Components[i].Process();
		}
		
		var CompleteSubX = this.Engine.Input.Mouse.SubX - this.Engine.MapManager.CurrentMap.BasePosition.X;
		var CompleteSubY = this.Engine.Input.Mouse.SubY - this.Engine.MapManager.CurrentMap.BasePosition.Y;
		
		CX.shadowColor = "#ccc"
		CX.shadowOffsetX = 1;
		CX.shadowOffsetY = 1;
		CX.shadowBlur = 1;
		CX.font     	= "normal 600 10pt DefaultFont";
		CX.fillStyle	= "#333";
		//CX.textBaseline = "top";
		
		CX.fillText("FPS: "+this.Engine.Renderer.FPS.toFixed(1), 13, 23);
		
		CX.fillText("Screen", 13, 56);
		CX.font = "normal 400 10pt DefaultFont";
		CX.fillText("Subdivision: 16px", 23, 74);
		CX.fillText("Size: W:"+this.Engine.Viewport.X+", H:"+this.Engine.Viewport.Y, 23, 89);
		CX.fillText("Base Pos.: X:"+this.Engine.MapManager.CurrentMap.BasePosition.X+", Y:"+this.Engine.MapManager.CurrentMap.BasePosition.Y, 23, 104);
		
		CX.font = "normal 600 10pt DefaultFont";
		CX.fillText("Map", 13, 138);
		CX.font = "normal 400 10pt DefaultFont";
		CX.fillText("Layers: 3", 23, 156);
		
		CX.fillText("Loaded: "+this.Engine.MapManager.CurrentMap.TileCount+" tile(s)", 23, 171);
		
		CX.fillText("Visible: "+(this.Engine.Viewport.X*this.Engine.Viewport.Y)+" tile(s) per layer", 23, 186);
		
		CX.font = "normal 600 10pt DefaultFont";
		CX.fillText("Tile Information", 13, 220);
		CX.font = "normal 400 10pt DefaultFont";
		CX.fillText("Mouse Sub. Pos.: X:"+this.Engine.Input.Mouse.SubX+", Y:"+this.Engine.Input.Mouse.SubY, 23, 239);
		CX.fillText("Layers ["+this.Engine.Input.Mouse.SubX+","+this.Engine.Input.Mouse.SubY+"]:", 23, 254);
		
		var layer1tile = this.Engine.MapManager.CurrentMap.Layers[MapLayers.Terrain][this.Engine.Input.Mouse.SubX][this.Engine.Input.Mouse.SubY];
		var layer1anim = (layer1tile instanceof AnimatedTile);
		
		if (layer1tile && LayerOne) {
			CX.fillText("1: "+(layer1anim ? "AnimatedTile [Frame: "+(layer1tile.CurrentFrame+1)+"]" : "Tile")+"", 33, 269);
		} else {
			CX.fillText("1: none", 33, 269);
		}
		
		var layer2tile = this.Engine.MapManager.CurrentMap.Layers[MapLayers.Objects][this.Engine.Input.Mouse.SubX][this.Engine.Input.Mouse.SubY];
		var layer2anim = (layer2tile instanceof AnimatedTile);
		
		if (layer2tile && LayerTwo) {
			CX.fillText("2: "+(layer2anim ? "AnimatedTile [Frame: "+(layer2tile.CurrentFrame+1)+"]" : "Tile")+"", 33, 284);
		} else {
			CX.fillText("2: none", 33, 284);
		}
		
		var layer3tile = this.Engine.MapManager.CurrentMap.Layers[MapLayers.Overlay][this.Engine.Input.Mouse.SubX][this.Engine.Input.Mouse.SubY];
		var layer3anim = (layer3tile instanceof AnimatedTile);
		
		if (layer3tile && LayerThree) {
			CX.fillText("3: "+(layer3anim ? "AnimatedTile [Frame: "+(layer3tile.CurrentFrame+1)+"]" : "Tile")+"", 33, 299);
		} else {
			CX.fillText("3: none", 33, 299);
		}
		
	},
	Process: function () {
		if (this.Engine.Input.Keyboard.GetKey(50)) {
			this.Show = !this.Show;
		}
		
		if (this.Show) {
			this.Draw();
		}
	},
	DrawGrid: function () {
		for (var X = 0; X <= (this.CO.width); X += 16)
		{
			this.CX.moveTo(0.5 + X, 0);
			this.CX.lineTo(0.5 + X, (this.CO.height));
		}
		
		for (var Y = 0; Y <= (this.CO.height); Y += 16)
		{
			this.CX.moveTo(0, 0.5 + Y);
			this.CX.lineTo((this.CO.width), 0.5 +  Y);
		}
		
		this.CX.lineWidth = 0.5;
		this.CX.strokeStyle = "#333";
		this.CX.stroke();
	}
});