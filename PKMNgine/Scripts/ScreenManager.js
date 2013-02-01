var ScreenManager = Class.extend({
	init: function (e, s) {
		this.Engine = e;
		this.CurrentScreen = s;
		this.ScreenCollection = [];
	},
	Update: function () {
		this.CurrentScreen.Update();
	},
	AddScreen: function (s) {
		this.ScreenCollection[s.Name] = s;
	},
	GetScreen: function (n) {
		return (this.ScreenCollection[n]);
	},
	AddScreenAndSet: function (s) {
		this.AddScreen(s);
		
		this.CurrentScreen = this.GetScreen(s.Name);
	}
});