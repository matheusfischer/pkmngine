var HUDCrosshair = Class.extend({
	init: function ( e ) {
		this.Engine = e;
		this.Frames = [new Vector2D(0,0), new Vector2D(16,0)];
		this.CurrentFrame = 0;
		this.NextFrame = 1;
		this.LastUpdate = new Date();
		this.Interval = 0.235;
		this.Image = false;
		this.Position = new Vector2D(0, 0);
		
		this.Load();
	},
	Load: function () {
		this.Image = this.Engine.Renderer.GetImage("HUDCrosshair");
	},
	Process: function () {
		if ((new Date() - this.LastUpdate) > (this.Interval * 1000)) {
			if (this.CurrentFrame) {
				this.CurrentFrame = 0;
				this.NextFrame = 1;
			} else {
				this.CurrentFrame = 1;
				this.NextFrame = 0;
			}
			this.LastUpdate = new Date();
		}
		
		this.Position = new Vector2D( this.Engine.Input.Mouse.SubX * 16, this.Engine.Input.Mouse.SubY * 16 );
		
		this.Draw();
	},
	Draw: function () {
		if (this.Image) {
			(this.Engine.Renderer.GetContext()).drawImage(this.Image, this.Frames[this.CurrentFrame].X, this.Frames[this.CurrentFrame].Y, 16, 16, this.Position.X, this.Position.Y, 16, 16);
		}
	}
});