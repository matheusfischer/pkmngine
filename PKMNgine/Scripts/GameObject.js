var GameObject = Class.extend({
	init: function ( e ) {
		this.Engine = e;
		this.Active = true;
		this.Position = new Vector2D(0, 0);
	}
});