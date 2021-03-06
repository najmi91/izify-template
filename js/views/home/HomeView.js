define(['jquery', 'underscore', 'backbone','models/global/GlobalModel','collections/product/ProductCollection','views/sidebar/SidebarView','text!templates/home/homeTemplate.html'], function($, _, Backbone,GlobalModel,ProductCollection,SidebarView, homeTemplate) {
    var HomeView = Backbone.View.extend({
        el: $("#page"),
        initialize: function() {
            this.$el.off();
        },
        render: function() {
            var that = this;
			var global = new GlobalModel();
            this.collection = new ProductCollection();
			var formValues = {
                merchantId: global.merchantId
            };
            this.collection.fetch({
				 data: formValues,
                success: function(collection, response) {
                    var template = _.template(homeTemplate, {
                        products: that.collection.models
                    });
                    that.$el.html(template);
                },
                error: function(collection, response) {
                    console.log("error");
                }
            });
			
			var sidebarView = new SidebarView();
			sidebarView.render();
        },
    });
    return HomeView;
});