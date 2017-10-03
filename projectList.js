const fs = require('fs');
const Handlebars = require('handlebars');

function getHtmlPage(){
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Maggie's Projects</title>
    </head>
    <body>
        <h1>Maggie's Portfolio</h1>
        <ul>
            {{#this}}
            <li><a href="/projects/{{.}}">{{.}}</a></li>
            {{/this}}
        </ul>

    </body>
    </html>`;


    var template = Handlebars.compile(html);
    //this will return an array of all the project file names
    var dirs = fs.readdirSync(`${__dirname}/projects`);
    return template(dirs);
}

module.exports.getHtmlPage = getHtmlPage;
