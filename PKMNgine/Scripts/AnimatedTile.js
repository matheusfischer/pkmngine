var AnimatedTile = Class.extend({
	init: function ( m, layer, pos, frames, type ) {
		this.Map = m;
		this.Position = new Vector2D((pos[0]*16), (pos[1]*16));
		this.Frames = this.ProcessFrames(frames);
		this.FrameLimit = (this.Frames.length - 1);
		this.CurrentFrame = 0;
		this.Type = type;
		this.Image = m.GetImageFromLayer(layer);
	},
	ProcessFrames: function ( frames ) {
		var result = [];
		for(var f = 0; f < frames.length; f++) {
			result[f] = new Vector2D(frames[f][0] * 16, frames[f][1] * 16);
		}
		return result;
	},
	Draw: function () {
		var CX = this.Map.Engine.Renderer.GetContext();
		
		var FullBasePos = new Vector2D( this.Map.BasePosition.X * 16, this.Map.BasePosition.Y * 16 );
		var Pos = Vector2D.AddOut( this.Position, FullBasePos );
		
		if (this.Image != undefined) {
			CX.drawImage(this.Image, this.Frames[this.CurrentFrame].X, this.Frames[this.CurrentFrame].Y, 16, 16, Pos.X, Pos.Y, 16, 16);
		}
	},
	UpdateFrame: function () {
		if (this.CurrentFrame >= this.FrameLimit) {
			this.CurrentFrame = 0;
		} else {
			this.CurrentFrame++;
		}
	}
});