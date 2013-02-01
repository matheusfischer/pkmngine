var TileAnimationManager = Class.extend({
	init: function (e) {
		this.Engine = e;
		this.Interval = 0.235;
		this.Tiles = []
		this.TileCount = 0;
		this.LastUpdate = new Date();
		this.Activated = true;
	},
	RegisterAnimatedTile: function ( t ) {
		this.Tiles[this.TileCount] = t;
		this.TileCount++;
	},
	Update: function () {
		if (this.Activated) {
			var now = new Date();
			if (now - this.LastUpdate > (this.Interval * 1000)) {
				for( var i in this.Tiles ) {
					this.Tiles[i].UpdateFrame();
				}
				this.LastUpdate = now;
			}
		}
	}
});