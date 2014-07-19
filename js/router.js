define([
  'backbone',
  'controllers/page',
  'controllers/query'
], function (Backbone, page, query) {
  'use strict';

  return Backbone.Router.extend({
    routes: {
      '/*': 'query'
    },
    query: query
  });
});