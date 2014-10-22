var app = app || {};

app.VideoListItemView = Backbone.View.extend({
	template: _.template($('#video-list-item-template').html()),
	tagName: 'li',

	events: {
		'click': 'onClick'
	},

	initialize: function (options) {

	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	},

	onClick: function(e){
		app_router.navigate('watch/' + this.model.cid, { trigger: true });
	}
});
