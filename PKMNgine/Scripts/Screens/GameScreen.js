var GameScreen = Screen.extend({
	init: function (e) {
		this._super("GameScreen", e);
		
		this.HUD = new HUD(this.Engine);
		
		this.FadeInEffect = true;
		this.FadeInIndex = 1;
	},
	Draw: function () {
		var CX = this.Engine.Renderer.GetContext();
		
		this.Engine.MapManager.ProcessMap();
		this.HUD.Process();
		
		if (this.FadeInEffect && (this.FadeInIndex > 0)) {
			CX.beginPath();
			CX.rect(0, 0, this.Engine.O.width, this.Engine.O.height);
			CX.fillStyle = 'rgba(0, 0, 0, ' + this.FadeInIndex + ')';
			CX.fill();
			
			this.FadeInIndex -= 0.05;
			
			if (this.FadeInIndex <= 0) {
				this.FadeInEffect = false;
			}
		}
	}
});