var app = app || {};

app.VideoView = Backbone.View.extend({
	template: _.template($('#video-template').html()),

	events: {
	},

	initialize: function (options) {
		this.tags =  this.model.get('tags').split(';');
	},

	render: function () {
		var i = 0;

		this.$el.html(this.template(this.model.toJSON()));
		this.$tag_list = this.$('#tags');

		for (i = 0; i < this.tags.length; i++){
			if(this.tags[i].trim().length > 0)
			this.$tag_list.append('<li class="tag"><a href="#search/' + this.tags[i] + '">'+this.tags[i] +'</a></li>');
		}

		return this;
	}
});
