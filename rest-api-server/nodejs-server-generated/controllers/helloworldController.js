'use strict'

var varhelloworldController = require('./helloworldControllerService');

module.exports.helloWorld = function helloWorld(req, res, next) {
  varhelloworldController.helloWorld(req.swagger.params, res, next);
};