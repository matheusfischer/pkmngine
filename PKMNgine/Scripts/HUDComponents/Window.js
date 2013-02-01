var Window = Component.extend({
	init: function (e, vis, pos, dim) {
		this._super(e, vis, pos, dim);
		
		this.BasePosition = new Vector2D(24, 0);
		
		this.Load();
	},
	Load: function () {
		this._super();
		
		this.FrameImage = this.Engine.Renderer.GetImage("HUDFrames");
	},
	Draw: function () {
		this._super();
		
		if (this.Visibility && (this.FrameImage)) {
			var CX = this.Engine.Renderer.GetContext();
			
			CX.beginPath();
			CX.rect(this.Position.X + 8, this.Position.Y + 8, this.Dimension.X * 8, (this.Dimension.Y * 8));
			CX.fillStyle = '#FFF';
			CX.fill();
			
			CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.TopLeft.X, this.BasePosition.Y + FrameSubdivisions.TopLeft.Y, 8, 8, this.Position.X, this.Position.Y, 8, 8);
			CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.TopRight.X, this.BasePosition.Y + FrameSubdivisions.TopRight.Y, 8, 8, this.Position.X + ((this.Dimension.X * 8) + 8), this.Position.Y, 8, 8);
			
			CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.BottomLeft.X, this.BasePosition.Y + FrameSubdivisions.BottomLeft.Y, 8, 8, this.Position.X, this.Position.Y + ((this.Dimension.Y * 8) + 8), 8, 8);
			CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.BottomRight.X, this.BasePosition.Y + FrameSubdivisions.BottomRight.Y, 8, 8, this.Position.X + ((this.Dimension.X * 8) + 8), this.Position.Y + ((this.Dimension.Y * 8) + 8), 8, 8);
			
			for(var i = 1; i < (this.Dimension.X + 1); i++) {
				var Position = Vector2D.AddOut(this.Position, new Vector2D(i * 8, 0));
				CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.TopCenter.X, this.BasePosition.Y + FrameSubdivisions.TopCenter.Y, 8, 8, Position.X, Position.Y, 8, 8);
				CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.BottomCenter.X, this.BasePosition.Y + FrameSubdivisions.BottomCenter.Y, 8, 8, Position.X, this.Position.Y + ((this.Dimension.Y * 8) + 8), 8, 8);
			}
			
			for(var i = 1; i < (this.Dimension.Y + 1); i++) {
				var Position = Vector2D.AddOut(this.Position, new Vector2D(0, i * 8));
				CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.MidLeft.X, this.BasePosition.Y + FrameSubdivisions.MidLeft.Y, 8, 8, Position.X, Position.Y, 8, 8);
				CX.drawImage(this.FrameImage, this.BasePosition.X + FrameSubdivisions.MidRight.X, this.BasePosition.Y + FrameSubdivisions.MidRight.Y, 8, 8, this.Position.X + ((this.Dimension.X * 8) + 8), Position.Y, 8, 8);
			}
		}
	},
	Process: function () {
		this._super();
		
		this.Draw();
	}
});

var FrameSubdivisions = {
	TopLeft: new Vector2D(0, 0),
	TopCenter: new Vector2D(8, 0),
	TopRight: new Vector2D(16, 0),
	MidLeft: new Vector2D(0, 8),
	MidCenter: new Vector2D(8, 8),
	MidRight: new Vector2D(16, 8),
	BottomLeft: new Vector2D(0, 16),
	BottomCenter: new Vector2D(8, 16),
	BottomRight: new Vector2D(16, 16)
};