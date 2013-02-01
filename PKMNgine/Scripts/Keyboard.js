var Keyboard = Class.extend({
	init: function () {
		this.Alt = false;
		this.Ctrl = false;
		this.Shift = false;
		this.Keys = [];
		
		this.Reset();
	},
	HookKeyDown: function (e) {		
		this.Alt = e.altKey;
		this.Ctrl = e.ctrlKey;
		this.Shift = e.shiftKey;
		
		this.Keys[e.keyCode] = true;
	},
	Reset: function () {
		for(var i = 0; i < 0xFF; i++) {
			this.Keys[i] = false;
		}
	},
	GetKey: function ( k ) {
		var v = this.Keys[k];
		
		this.Keys[k] = false;
		 
		return v;
	}
});