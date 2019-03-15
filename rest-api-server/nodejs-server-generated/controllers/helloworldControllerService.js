'use strict'

module.exports.helloWorld = function helloWorld(req, res, next) {
  res.send({
    result: 'Hello ' + req.data.value.name,
    HOSTNAME: process.env.HOSTNAME,
  });
};