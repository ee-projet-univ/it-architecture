var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';
var args = {name: 'emilien'};

soap.createClient(url, function(err, client) {
    client.HelloWorld(args, function(err, result) {
        console.log(result);
    });
});