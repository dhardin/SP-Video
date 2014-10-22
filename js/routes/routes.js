var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'browse',
		'search/:query': 'search',
		'search/*': 'search',
		'watch': 'browse',
		'watch/:id': 'browse',
		'watch/*': 'browse'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	browse: function  (id) {
		var browseView = (id ? new app.BrowseView({video_id: id}) : new app.BrowseView());
		   this.AppView.showView(browseView);
	},
	search: function  (query) {
		var browseView = (query ? new app.BrowseView({search: query}) : new app.BrowseView());
		   this.AppView.showView(browseView);
	},
});


var app_router = new Router({AppView: app.AppView});

Backbone.history.start();
