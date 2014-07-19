define([
  'backbone',
  'collections/nav-items',
  'views/header',
  'views/sidebar',
  'views/query',
  'views/footer'
], function (Backbone, NavItemsCollection, HeaderView, SidebarView, QueryView, FooterView) {
  'use strict';

  return function () {
    var headerView = new HeaderView(),
      sidebarView = new SidebarView(),
      queryView = new QueryView(),
      footerView = new FooterView();

    headerView.collection = new NavItemsCollection();
    headerView.collection.fetch().success(function () { headerView.render(); });
    sidebarView.render();

    queryView.render();

    footerView.render();
  }
});