var app = app || {};

app.Video = Backbone.Model.extend({
    defaults: {
        title: '',
        src: '',
        tags: ''
    }
});
