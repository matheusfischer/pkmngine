var Vector2D = Class.extend({
	init: function ( x, y ) {
		this.X = x;
		this.Y = y;
	},
	Add: function ( v ) {
		this.X += v.X;
		this.Y += v.Y;
	},
	Multiply: function ( v ) {
		this.X *= v.X;
		this.Y *= v.Y;
	}
});

Vector2D.AddOut = function ( v1, v2 ) {
	return (new Vector2D(v1.X+v2.X, v1.Y+v2.Y));
}