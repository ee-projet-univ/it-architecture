var myService = {
    SoapWebService: {
        SoapWebService_0: {
            HelloWorld: function (args) {
                return { result: 'Hello ' + args.name };
            }
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = require('http').createServer(function (request, response) {
    response.end('404: Not Found: ' + request.url);
});

server.listen(8000);

require('soap').listen(server, '/wsdl', myService, xml);
