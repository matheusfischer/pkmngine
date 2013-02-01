var Tile = Class.extend({
	init: function ( m, layer, pos, texpos, type ) {
		this.Map = m;
		this.Position = new Vector2D((pos[0]*16), (pos[1]*16));
		this.TexturePosition = new Vector2D((texpos[0]*16), (texpos[1]*16));
		this.Type = type;
		this.Layer = layer;
		this.Image = m.GetImageFromLayer(layer);
	},
	Draw: function () {
		var CX = this.Map.Engine.Renderer.GetContext();
		
		var FullBasePos = new Vector2D( this.Map.BasePosition.X * 16, this.Map.BasePosition.Y * 16 );
		var Pos = Vector2D.AddOut( this.Position, FullBasePos );

		if (this.Image != undefined) {
			CX.drawImage(this.Image, this.TexturePosition.X, this.TexturePosition.Y, 16, 16, Pos.X, Pos.Y, 16, 16);
		}
	}
});