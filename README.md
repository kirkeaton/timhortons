# timhortons

[![Build Status](https://travis-ci.org/kirkeaton/timhortons.svg?branch=master)](https://travis-ci.org/kirkeaton/timhortons)

## Description
Tim Hortons store finder

## Installation 
```
npm install --save timhortons
```

## Usage
```
const timhortons = require('timhortons');

const opts = {
  rad: 5,
  origlat: 43.446579,
  origlng: -79.696926
};

timhortons(opts)
.then(function (stores) {
  console.log(stores);
});
```

## Documentation

### timhortons(options)

#### options
Type: `object`<br/>
Required: `true`

#### options.rad
Type: `number`<br/>
Required: `false`<br/>
Default: `5`<br/>
Description: Search radius in KM

#### options.origlat
Type: `number`<br/>
Required: `true`<br/>
Description: Latitude

#### options.origlng
Type: `number`<br/>
Required: `true`<br/>
Description: Longitude
