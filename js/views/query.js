define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'numeral',
  'templates',
  'views/messages',
  'views/items',
  '../lib/dpla'
], function ($, _, Backbone, config, numeral, templates, MessagesView, ItemsView, DPLA) {
  'use strict';

  return Backbone.View.extend({
    el: '#main',
    events: {
      'click #search-submit': 'queryItems',
      'submit #search-submit': 'queryItems'
    },
    queryItems: function (e) {
      var formData = this.$form.serializeArray(),
        searchField = _.findWhere(formData, { name: 'search-field' }).value,
        searchTerm = _.findWhere(formData, { name: 'search-term' }).value;

      e.preventDefault();

      this.DPLA.queryItems(searchField, searchTerm).then(this.queryItemsSuccess.bind(this), this.queryItemsError.bind(this));

    },
    queryItemsSuccess: function (data) {
      if (data.docs.length === 0) {
        this.messagesView.showMessages([{ text: 'No results found', level: 'info' }]);
      }
      this.messagesView.showMessages([{ text: 'Displaying ' + numeral(data.docs.length).format('0,0') + ' of ' + numeral(data.count).format('0,0') + ' items', level: 'info' }]);
      this.itemsView.showItems(data.docs);
    },
    queryItemsError: function (err) {
      this.messagesView.showMessages([{
        text: err.status + ': ' + err.statusText,
        level: 'warning'
      }]);
    },
    initialize: function () {
      this.DPLA = new DPLA({
        apiKey: config.DPLAApiKey
      });
      this.messagesView = new MessagesView();
      this.itemsView = new ItemsView();
    },
    render: function () {
      this.$el.html(_.template(templates.query, {
        fields: DPLA.fields
      }));
      this.$form = this.$('form');
      this.messagesView.setElement(this.$('.messages'));
      this.itemsView.setElement(this.$('.items'));
    }
  });
});