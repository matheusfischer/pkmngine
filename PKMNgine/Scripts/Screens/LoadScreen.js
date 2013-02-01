var LoadScreen = Screen.extend({
	init: function (e) {
		this._super("LoadScreen", e);
		
		this.LoadingTime = 1;
		this.WhenWasLoaded = false;
		this.GetLoadingData();
	},
	Update: function () {
		
		if (EngineResourcesLoaded && (!this.WhenWasLoaded)) {
			this.WhenWasLoaded = new Date();
		}
		
		if (this.WhenWasLoaded instanceof Date) {
			if (((new Date()) - this.WhenWasLoaded) > (this.LoadingTime * 1000)) {
				this.Engine.ScreenManager.AddScreenAndSet(new GameScreen(this.Engine));
			}
		}
		
		this._super();
	},
	GetLoadingData: function () {
		EngineResourcesCount = $("img[gameresource]").length;
		
		$(window).load(function () {
			EngineResourcesLoaded = true;
		});
		
		$("img[gameresource]").load(function () {
			EngineResourcesLoadedCount++;
		});
	},
	Draw: function () {
		var CX = this.Engine.Renderer.GetContext();

		CX.font     	= "normal 600 18pt DefaultFont";
		CX.fillStyle	= "#fff";
		
		CX.fillText("Waiting for game data...", 10, 30);
		
		CX.font     	= "normal 400 10pt DefaultFont";
		// \/ Wrong?
		// CX.fillText("Loading Textures... ["+EngineResourcesLoadedCount+" / "+EngineResourcesCount+"]" , 10, 50);
		CX.fillText("Loading Textures..." , 10, 50);
		
		if (this.WhenWasLoaded instanceof Date) {
			CX.fillText("Waiting... "+this.GetRemainingTime()+"s" , 10, 70);
		}
	},
	GetRemainingTime: function () {
		var rtime = (this.LoadingTime - (((new Date()) - this.WhenWasLoaded) / 1000).toFixed(0));
		return ((rtime > 0) ? rtime : 0);
	}
});