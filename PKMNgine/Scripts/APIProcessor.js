var APIProcessor = Class.extend({
	init: function (b) {
		this.BaseURL = b;
	},
	Request: function (r, c) {
		$.ajax({
			url: this.BaseURL + "?op=" + r,
			dataType: "json",
			success: function (data) {
				c(data);
			}
		});
	}
});