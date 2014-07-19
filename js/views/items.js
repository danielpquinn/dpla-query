define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.collection = new Backbone.Collection.extend();
    },
    showItems: function (items) {
      this.collection = new Backbone.Collection(items);
      this.render();
    },
    render: function () {
      this.$el.html(_.template(templates.items, {
        items: this.collection.toJSON()
      }));
    }
  });
});