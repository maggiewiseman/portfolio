const fs = require('fs');
const path = require('path');
const projectList = require('./projectList').getHtmlPage;


const contentType = {
    '.html' : 'text/html',
    '.css': 'text/css',
    '.js' : 'text/javascript',
    '.json' : 'application/json',
    '.gif' : 'image/gif ',
    '.jpg' : 'image/jpeg ',
    '.png' : 'image/png ',
    '.svg' : 'image/svg+xml',
};


function handleReqs(req, res, fileMap) {
    if(fileMap[req.url]) {

        console.log('it exists');
        //this is where I need to do set content header
        const type = contentType[path.extname(fileMap[req.url])];
        console.log(type);
        res.writeHead(200, {'Content-Type' : type});

        const stream = fs.createReadStream(fileMap[req.url]);

        stream.on('error', (err) => {
            console.error(err);
            res.statusCode = 500;
            res.end();
        });

        stream.pipe(res);

    } else if (fileMap[req.url + '/']){

        console.log('redirecting');
        res.writeHead(302, {'location' : req.url + '/'});
        res.end();

    } else if (req.url == '/'){

        res.writeHead(200, {'Content-Type' : 'text/html'});
        let htmlList = projectList();
        console.log(htmlList);
        res.end(htmlList);

    } else {
        res.statusCode = 404;
        res.end('file not found');
    }
}

module.exports.handleReqs = handleReqs;
