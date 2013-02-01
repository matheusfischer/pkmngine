var Renderer = Class.extend({
	init: function (e) {
		this.CO 			= e.O;
		this.CX				= this.CO.getContext('2d');
		
		this.Engine			= e;
		
		this.FPS			= 0;
		this.FPSNowTime		= new Date();
		this.FPSLastUpdate	= (new Date)*1 - 1;
		
		this.Cache		= [];
		this.CacheCount = 0;
	},
	GetContext: function () {
		return this.CX;
	},
	Clear: function () {
		this.CO.width = this.CO.width;
	},
	UpdateFPS: function () {
		var thisFrameFPS = 1000 / ((this.FPSNowTime=new Date) - this.FPSLastUpdate);
		this.FPS += (thisFrameFPS - this.FPS) / FPSFilter;
		this.FPSLastUpdate = this.FPSNowTime * 1 - 1;
	},
	GetImage: function (id) {
		return document.getElementById(id);
	}
});

Renderer.DrawTextShadowed = function ( cx, text, fcolor, bcolor, pos ) {
	//cx.fillStyle = bcolor;
	//cx.fillText(text, (pos.X+1), (pos.Y+1));
	cx.fillStyle = fcolor;
	cx.fillText(text, (pos.X), (pos.Y));
}