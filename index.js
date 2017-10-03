const http = require('http');
const handler = require('./handler');
const getMap = require('./fileMap').getMap;

const fileMap = getMap('/projects');
console.log(fileMap);

const server = http.createServer().listen(8080, () => console.log('Listening on port 8080.'));

server.on('request', function(req, res){
    if(req.err) {
        console.error(req.err);
        return;
    }

    if(req.method != 'GET') {

        res.statusCode = 404;
        console.log('method not allowed');
        res.end();

    } else {

        handler.handleReqs(req, res, fileMap);

    }
});
