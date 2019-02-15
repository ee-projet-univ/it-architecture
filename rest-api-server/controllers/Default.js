'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.helloWorld = function helloWorld (req, res, next) {
  var name = req.swagger.params['name'].value;
  Default.helloWorld(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
