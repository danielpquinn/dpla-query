define([
  'bluebird'
], function (Bluebird) {
  'use strict';


  /**
   * Constructor
   */
  function DPLA(config) {
    this.apiKey = config.apiKey;
  }

  
  // Static vars
  DPLA.apiRoot = 'http://api.dp.la/v2/';
  DPLA.fields = [
    '@id',
    'dataProvider',
    'hasView',
    'hasView.@id',
    'hasView.format',
    'hasView.rights',
    'id',
    'ingestDate',
    'ingestType',
    'isShownAt',
    'isShownAt.@id',
    'isShownAt.rights',
    'object',
    'object.@id',
    'object.format',
    'object.rights',
    'provider',
    'provider.@id',
    'provider.name',
    'sourceResource',
    'sourceResource.collection',
    'sourceResource.collection.@id',
    'sourceResource.contributor',
    'sourceResource.creator',
    'sourceResource.date',
    'sourceResource.date.begin',
    'sourceResource.date.displayDate',
    'sourceResource.date.end',
    'sourceResource.description',
    'sourceResource.extent',
    'sourceResource.format',
    'sourceResource.identifier',
    'sourceResource.language',
    'sourceResource.language.name',
    'sourceResource.language.iso639',
    'sourceResource.physicalMedium',
    'sourceResource.publisher',
    'sourceResource.rights',
    'sourceResource.spatial',
    'sourceResource.spatial.coordinates',
    'sourceResource.spatial.city',
    'sourceResource.spatial.county',
    'sourceResource.spatial.distance',
    'sourceResource.spatial.country',
    'sourceResource.spatial.iso3166-2',
    'sourceResource.spatial.name',
    'sourceResource.spatial.region',
    'sourceResource.spatial.state',
    'sourceResource.stateLocatedIn.name',
    'sourceResource.subject',
    'sourceResource.subject.@id',
    'sourceResource.subject.@type',
    'sourceResource.subject.name',
    'sourceResource.temporal',
    'sourceResource.temporal.begin',
    'sourceResource.temporal.end',
    'sourceResource.title',
    'sourceResource.type',
    'start'];

  
  /**
   * Query Items
   * @param  {String} term Search term
   * @return {Promise}     Promise
   */
  DPLA.prototype.queryItems = function (field, term) {
    var self = this,
      field = field || 'q',
      d = Bluebird.defer();

    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: DPLA.apiRoot + 'items?' + field + '=' + encodeURIComponent(term) + '&api_key=' + self.apiKey,
      success: function (data) {
        d.resolve(data);
      },
      error: function (err) {
        d.reject(err);
      }
    });

    return d.promise;
  };

  return DPLA;
});