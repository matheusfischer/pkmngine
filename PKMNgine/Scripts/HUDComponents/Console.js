var Console = Component.extend({
	init: function (e) {
		this._super(e, true, new Vector2D(0, 0), new Vector2D(0, 0));
		
		this.LastUpdate = new Date();
		this.UpdateInterval = 0.235;
	},
	Load: function () {
		this.Dimension = new Vector2D( this.Engine.O.width, this.Engine.O.height / 3 );
	},
	Draw: function () {
		this._super();
		
		var CX = this.Engine.Renderer.GetContext();
	
		CX.beginPath();
		CX.rect(this.Position.X, this.Position.Y, this.Dimension.X, this.Dimension.Y);
		CX.fillStyle = 'rgba(0, 0, 0, 0.8)';
		CX.fill();
	},
	OnClick: function () {
		this._super();
		
		//this.Visibility = false;
		
		this.SlideUp();
	},
	SlideUp: function () {
	}
});