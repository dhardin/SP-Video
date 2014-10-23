var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#video-collection-template').html()),

	events: {
		'update-sort': 'updateSort'
	},

	initialize: function (){
		this.collection = app.LibraryCollection;
		//this.render();
		this.on('search', this.search);
		this.listenTo(this.collection, 'add, reset, change', function(){ this.render(this.collection);});
	},

	render: function (collection, isFiltered) {
		var totalItems,
			numItemsDisplayed;
		if(!collection){
			this.$el.html(this.template());
			this.$videos = this.$el.find('#videos'); 	
		}

		collection = collection || this.collection;
		this.$videos.html('');

		if (!isFiltered){
			if (collection.length > 0){
				collection.each(function(item){
				this.renderVideo(item);
			}, this);
			} else {
				this.$videos.html($('#noVideosTemplate').html());
			}
		} else {
			totalItems = this.collection.length;
			numItemsDisplayed = collection.toArray().length;

			this.$videos.html('Displaying ' + numItemsDisplayed + ' out of ' + totalItems);
			collection.each(function(item){
				this.renderVideo(item);
			}, this);
		}

		
	},

	renderVideo : function(item, $container){
		var videoView = new app.VideoListItemView({
			model: item
		});
		if($container){
			$container.append(videoView.render().el);
		} else {
			this.$videos.append(videoView.render().el);
		}
	},

	 updateSort: function(event, model, position){
    	this.collection.remove(model);

    	this.collection.each(function(model, index){
    			var ordinal = index;
    			if (index >= position){
    				ordinal += 1;
    			}
    			model.set('rank', ordinal + 1);
    	});
    	model.set('rank', position + 1);
    	this.collection.add(model, {at: position});

    	this.render(this.collection);
    },

	search: function(options){
		var text = options.val;
		if (text.length > 0){
			this.render(this.collection.search(text), true);
		} else {
			this.render(this.collection);
		}
	}
});