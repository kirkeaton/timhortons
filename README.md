# timhortons

[![CircleCI](https://circleci.com/gh/kirkeaton/timhortons.svg?style=svg)](https://circleci.com/gh/kirkeaton/timhortons)

## Description

Tim Hortons store finder

## Installation

```
npm install --save timhortons
```

## Usage

```
import timhortons from 'timhortons';

const opts = {
  radius: 5,
  latitude: 43.446579,
  longitude: -79.696926
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

#### options.radius

Type: `number`<br/>
Required: `false`<br/>
Default: `5`<br/>
Description: Search radius in KM

#### options.latitude

Type: `number`<br/>
Required: `true`<br/>
Description: Latitude

#### options.longitude

Type: `number`<br/>
Required: `true`<br/>
Description: Longitude
