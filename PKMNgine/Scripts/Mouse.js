var Mouse = Class.extend({
	init: function () {
		this.X = 0;
		this.Y = 0;
		this.SubX = 0;
		this.SubY = 0;
		this.Buttons = {
			Left: false, Right: false
		};
	},
	HookMove: function (e) {
		this.X = e.clientX;
		this.Y = e.clientY;
		this.SubX = ((this.X / 16).toFixed(0) - 1);
		this.SubY = ((this.Y / 16).toFixed(0) - 1);
	},
	HookMouseDown: function (e) {
		this.Buttons.Left = (e.which == MouseButtons.Left);
		this.Buttons.Right = (e.which == MouseButtons.Right);
	},
	HookMouseUp: function (e) {
		this.Buttons.Left = false;
		this.Buttons.Right = false;
	},
	IsInBounds: function () {
		var bool1 = (this.SubX >= 0 && this.SubX <= Bounds.X);
		var bool2 = (this.SubY >= 0 && this.SubY <= Bounds.Y);
		
		return bool1 && bool2;
	}
});

var MouseButtons = {
	Left: 1,
	Middle: 2,
	Right: 3
}