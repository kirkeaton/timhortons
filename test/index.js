'use strict';

const Lab = require('lab');
const assert = require('assert');
const timhortons = require('..');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;

describe('Tim Hortons', { timeout: 5000 }, function () {
  it('should return tim hortons stores given valid lat and lng', function (done) {
    timhortons({
      origlat: 43.6371620,
      origlng: -79.4005990
    })
    .then(function (result) {
      //console.log(JSON.stringify(result));
      return done();
    })
    .catch(function (err) {
      return done(err);
    });
  });

  it('should return tim hortons stores given valid radius, lat and lng', function (done) {
    timhortons({
      rad: 10,
      origlat: 43.6371620,
      origlng: -79.4005990
    })
    .then(function (result) {
      //console.log(JSON.stringify(result));
      return done();
    })
    .catch(function (err) {
      return done(err);
    });
  });

  it('should throw error given missing options', function (done) {
    timhortons()
    .then(function () {
      return done(new Error('Should not return results with missing options'));
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: options');
      return done();
    });
  });

  it('should throw error given invalid radius', function (done) {
    timhortons({
      rad: -1,
      origlat: 43.6371620,
      origlng: -79.4005990
    })
    .then(function (result) {
      return done(new Error('Should not return results with invalid radius'));
    })
    .catch(function (err) {
      assert(err.message === 'Invalid parameter: radius must be greater than 0');
      return done();
    });
  });

  it('should throw error given missing latitude', function (done) {
    timhortons({
      origlng: -79.4005990
    })
    .then(function () {
      return done(new Error('Should not return results with missing latitude'));
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: origlat');
      return done();
    });
  });

  it('should throw error given missing longitude', function (done) {
    timhortons({
      origlat: 43.6371620,
    })
    .then(function () {
      return done(new Error('Should not return results with missing longitude'));
    })
    .catch(function (err) {
      assert(err.message === 'Missing required parameter: origlng');
      return done();
    });
  });
});
