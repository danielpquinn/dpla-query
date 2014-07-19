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
    showMessages: function (messages) {
      this.collection = new Backbone.Collection(messages);
      this.render();
    },
    render: function () {
      this.$el.html(_.template(templates.messages, {
        messages: this.collection.toJSON()
      }));
    }
  });
});