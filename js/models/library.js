var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Video,
    comparator: function (property) {
        return selectedStrategy.apply(myModel.get(property));
    },
    strategies: {
        title: function (video) { return video.get("title"); }
    },
    changeSort: function (sortProperty) {
        this.comparator = this.strategies[sortProperty];
        this.trigger('sortList');
    },
    initialize: function () {
        this.changeSort("title"); 
    },
    search: function (text) {
        var regex, key;

        if (text.length == 0) {
            return this;
        }

        regex = new RegExp(text, "i");

        return _(this.filter(function(data) {
            for (key in data.attributes){
                if (regex.test(data.attributes[key])){
                    return true;
                }
            }
            return false;
        }));

    }                                                                          
});