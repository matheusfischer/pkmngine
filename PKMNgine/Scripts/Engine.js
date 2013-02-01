var Engine = Class.extend({
	init: function (o) {
		this.O					= document.getElementById(o);
		this.Input				= new InputManager(this.O);
		this.Renderer			= new Renderer(this);
		this.MapManager			= new MapManager(this);
		
		this.API				= new APIProcessor("http://127.0.0.1:8080/pokemon/api.php");
		//this.API				= new APIProcessor("http://177.141.187.54:8080/pokemon/api.php");
		
		this.HUD				= new HUD(this);
		
		this.Viewport			= new Vector2D((this.O.width / 16), (this.O.height / 16));
		
		this.ScreenManager		= new ScreenManager(this, new LoadScreen(this));
		
		this.PreProcessList		= [ ];
		this.PostProcessList	= [ ];
		
		this.Load();
		
		this.Routine();
	},
	Load: function () {
		GlobalEngine = this;
		
		/**
		 * TODO: Server
		 */
		
		this.MapManager.LoadMap( "testMap" );
	},
	Routine: function () {
		if (!GlobalEngine) {
			this.Load();
		}
		
		//GlobalEngine.API.Request("heartbeat", function (d) {
		
			//if (d.request) {
	
		GlobalEngine.Renderer.Clear();
		GlobalEngine.Renderer.UpdateFPS();
			
		GlobalEngine.Input.GlobalHotkeys( GlobalEngine );
			
		for(var i in GlobalEngine.PreProcessList) {
			GlobalEngine.PreProcessList[i]();
		}
		/*
		GlobalEngine.MapManager.ProcessMap();
			
		for ( var i in GlobalEngine.Objects )
		{
			GlobalEngine.Objects[i].Process();
		}
			
		GlobalEngine.HUD.Process();
		*/
		GlobalEngine.ScreenManager.Update();
			
		for(var i in GlobalEngine.PostProcessList) {
			GlobalEngine.PostProcessList[i]();
		}
		
		
		//setTimeout( GlobalEngine.Routine, (1000 / FPSLimit));
		animationFrame( GlobalEngine.Routine );
	}
});