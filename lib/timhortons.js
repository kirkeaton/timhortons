'use strict';

const rp = require('request-promise');
const Hoek = require('hoek');
const Promise = require('bluebird');
const xml2js = Promise.promisifyAll(require('xml2js'));

const API_URL = 'http://www.timhortons.com/ca/en/php/getRestaurants.php';
const DEFAULT = {
  units: 'km',
  rad: 5,
  origlat: undefined,
  origlng: undefined
};

/**
 * Transforms XML response into array of stores
 *
 * @param  {String} body XML Response from Tim Hortons API
 * @return {Promise}
 */
const TRANSFORM = function (body) {
  return xml2js.parseStringAsync(body)
  .then(function (result) {
    // Check for xml tags markers and marker
    if (!result.markers && !result.markers.marker) {
      return Promise.reject(new Error('Error fetching stores'));
    }
    // Extract stores from nested object
    return Promise.map(result.markers.marker, function (marker) {
      return marker.$;
    });
  });
};

/**
 * Fetches a list of Tim Hortons stores given a latitude and longitude
 *
 * @param  {Object} options Search options
 * @param  {Number} options.rad Search radius distance in KM
 * @param  {Number} options.origlat Longitude
 * @param  {Number} options.origlng Latitude
 * @return {Promise}
 */
module.exports = function (options) {
  if (!options) {
    return Promise.reject(new Error('Missing required parameter: options'));
  }
  const query = Hoek.applyToDefaults(DEFAULT, options);
  // Radius must be greater than 0
  if (query.rad <= 0) {
    return Promise.reject(new Error('Invalid parameter: radius must be greater than 0'));
  }
  // Latitude and longitude are both required
  if (!query.origlat) {
    return Promise.reject(new Error('Missing required parameter: origlat'));
  }
  if (!query.origlng) {
    return Promise.reject(new Error('Missing required parameter: origlng'));
  }

  return rp({ uri: API_URL, qs: query, transform: TRANSFORM });
};
