'use strict';

const Lab = require('@hapi/lab');
const assert = require('assert');
const timhortons = require('..');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;

describe('Tim Hortons', { timeout: 5000 }, function () {

  it('should return tim hortons stores given valid lat and lng', function (done) {
    return timhortons({
      origlat: 42.603187,
      origlng: -83.261646
    })
    .then(function (result) {
      assert(result.length > 0);
    });
  });

  it('should return tim hortons stores given valid radius, lat and lng', function (done) {
    return timhortons({
      rad: 10,
      origlat: 42.603187,
      origlng: -83.261646
    })
    .then(function (result) {
      assert(result.length > 0);
    });
  });

  it('should throw error given missing options', function (done) {
    return timhortons()
    .then(function () {
      throw new Error('Should not return results with missing options');
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: options');
    });
  });

  it('should throw error given invalid radius', function (done) {
    return timhortons({
      rad: -1,
      origlat: 42.603187,
      origlng: -83.261646
    })
    .then(function (result) {
      throw new Error('Should not return results with invalid radius');
    })
    .catch(function (err) {
      assert(err.message === 'Invalid parameter: radius must be greater than 0');
    });
  });

  it('should throw error given missing latitude', function (done) {
    return timhortons({
      origlng: -83.261646
    })
    .then(function () {
      throw new Error('Should not return results with missing latitude');
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: origlat');
    });
  });

  it('should throw error given missing longitude', function (done) {
    return timhortons({
      origlat: 42.603187,
    })
    .then(function () {
      throw new Error('Should not return results with missing longitude');
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: origlng');
    });
  });
  
});
