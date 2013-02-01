var InputManager = Class.extend({
	init: function ( o ) {
		this.Mouse = new Mouse();
		this.Keyboard = new Keyboard();
		
		var temp = this;
		
		$(o).mousemove(function (e) {
			temp.MouseMoveHook(e);
		});
		
		$(o).mousedown(function (e) {
			temp.MouseDownHook(e);
		});
		
		$(o).mouseup(function (e) {
			temp.MouseUpHook(e);
		});
		
		$(document).keydown(function (e) {
			temp.KeyboardHook(e);
		});
	},
	MouseMoveHook: function (e) {
		this.Mouse.HookMove(e);
	},
	KeyboardHook: function (e) {
		this.Keyboard.HookKeyDown(e);
	},
	MouseDownHook: function (e) {
		this.Mouse.HookMouseDown(e);
	},
	MouseUpHook: function (e) {
		this.Mouse.HookMouseUp(e);
	},
	Reset: function () {
		this.Keyboard.Reset();
	},
	GlobalHotkeys: function ( e ) {
		
		if (this.Keyboard.GetKey(49)) {
			e.MapManager.CurrentMap.AnimationManager.Activated = !e.MapManager.CurrentMap.AnimationManager.Activated;
		}
		
		if (this.Keyboard.GetKey(38)) {
			e.API.Request("move", function (data) {
				if (data.request) {
					e.MapManager.CurrentMap.BasePosition.Add(new Vector2D(0, -1));
				}
			});
		}
		if (this.Keyboard.GetKey(40)) {
			e.API.Request("move", function (data) {
				if (data.request) {
					e.MapManager.CurrentMap.BasePosition.Add(new Vector2D(0, 1));
				}
			});
		}
		if (this.Keyboard.GetKey(39)) {
			e.API.Request("move", function (data) {
				if (data.request) {
					e.MapManager.CurrentMap.BasePosition.Add(new Vector2D(1, 0));
				}
			});
		}
		if (this.Keyboard.GetKey(37)) {
			e.API.Request("move", function (data) {
				if (data.request) {
					e.MapManager.CurrentMap.BasePosition.Add(new Vector2D(-1, 0));
				}
			});
		}
		
		//alert( e.MapManager.CurrentMap.BasePosition.X );
	}
});