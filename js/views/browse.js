var app = app || {};

app.BrowseView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#browse-template').html()),

	events: {
		'keyup #search': 'onSearch',
		'click #clearSearch': 'onClearSearch'
	},
	initialize: function (options) {
		var that = this;

		this.libraryView =  new app.LibraryView();
		if(options && options.video_id){
			this.video_id = (typeof this.libraryView.collection.get({cid: options.video_id}) !== 'undefined' ? options.video_id : false);
		}
		if (options && options.search){
			this.search = options.search;
		}

		this.on('renderComplete', this.onRenderComplete);

	},

	render: function () {
		this.$el.html(this.template());
		return this.trigger('renderComplete');
	},

	onSearch: function(e){
		this.libraryView.trigger('search', {val: this.$search.val()});
		if(this.$search.val().length > 0){
			this.$clearSearch.show();
		} else {
			this.$clearSearch.hide();
		}
		this.$video_container.hide();
		app_router.navigate('search/' + this.$search.val(), { trigger: false });
	},

	onRenderComplete: function(e){
	    this.$video_collection = this.$('#video_collection');
	    this.$video_container = this.$('#video-container');
	    this.$search = this.$('#search');
	    this.$clearSearch = this.$('#clearSearch');
	    this.$clearSearch.hide();



	    if(!this.video_id){
	    	this.$video_container.hide();

	    } else {
	    	this.$video_container.show();

			video = this.libraryView.collection.get({cid: this.video_id});

			this.videoView = new app.VideoView({
				model: video
			});
			this.videoView.setElement(this.$video_container);
			this.videoView.render();	
	    }
		this.libraryView.setElement(this.$video_collection);
		this.libraryView.render();

		  if(this.search){
	    	this.$search.val(this.search);
	    	this.$search.trigger('keyup');
	    }
	},

	onClearSearch: function(e){
		this.$search.val('');
		 this.$clearSearch.hide();
		this.$search.trigger('keyup');
	}



});
