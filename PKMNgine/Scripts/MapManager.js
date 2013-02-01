var MapManager = Class.extend({
	init: function (e) {
		this.Engine = e;
		this.Maps = [];
		this.CurrentMap = [];
	},
	LoadMap: function ( map ) {
		if (!this.Maps[map]) {
			this.Maps[map] = new Map( this.Engine, map );
		}
		
		this.CurrentMap = this.Maps[map].Load();
	},
	ProcessMap: function () {
		this.CurrentMap.Process();
	}
});