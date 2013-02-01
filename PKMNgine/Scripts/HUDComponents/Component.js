var Component = Class.extend({
	init: function (e, vis, pos, dim) {
		this.Engine = e;
		this.Visibility = vis;
		this.Position = pos;
		this.Dimension = dim;
		
		this.AlreadyHasClicked = false;
		
		this.Load();
	},
	Load: function () {
	},
	Process: function () {
		if (this.Visibility) {
			var Mouse = new Vector2D( this.Engine.Input.Mouse.X, this.Engine.Input.Mouse.Y );
			
			if (Mouse.X >= this.Position.X && Mouse.Y >= this.Position.Y) {															// Inside superior bounds
				if (Mouse.X <= (this.Position.X + this.Dimension.X) && Mouse.Y <= (this.Position.Y + this.Dimension.Y)) {			// Inside inferior bounds
					if (this.Engine.Input.Mouse.Buttons.Left && !this.AlreadyHasClicked) {																	// Inside component...
						this.AlreadyHasClicked = true;
						this.OnClick();
					}
				}
			}
			
			if (!this.Engine.Input.Mouse.Buttons.Left) {
				this.AlreadyHasClicked = false;
			}
			
			this.Draw();
		}
	},
	OnClick: function () {
		console.log("Clicked.");
	},
	Draw: function () {
	}
});