'use strict';


/**
 * Performs hello world
 * 
 *
 * name String Name to be printed (optional)
 * no response value expected for this operation
 **/
exports.helloWorld = function (name) {
  return new Promise(function (resolve, reject) {
    resolve({ result: 'Hello ' + name });
  });
}

