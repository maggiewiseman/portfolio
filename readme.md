# Portfolio Project

<a href="https://maggie-wiseman-portfolio.herokuapp.com/carousel/description">See it live!</a>

## Summary & Structure
The goal was to build a server that would initially respond with an index.html file containing links to various projects in the projects directory. The projects are a collection of my javascript projects. This is my first real Node.js project.  I used the built in HTTP server module as well as the fs module to dynamically determine the list of projects to display. 

**server module**
* creates a map of the files in the projects directory that is used to validate requested urls.  Having a static list is not ideal because it prevents someone from finding newly added projects unless the server is restarted, but it was an opportunity to revisit recursively generating a tree structure using the built in module: fs.
* starts the server listening on port 8080
* validates any request and then sends the request off to a handler module which will create the response.

**handler module**
* this module contains a function called handleReqs that takes 3 parameters:
    * request: the request object.  The url of the request object is used for determining which project to send back in the response.
    * response: the response object. Used to send data back to the client.
        * responses are sent in two different ways...
            * if the request url pointed at the root directory, the client is asking for a list of projects.  In this case, a new module, projectList module, is called to generate an html page that lists the projects.
            * because different file types could be returned, I needed to explicitly set the header for each response.  I used a contentType object that mapped a file extension to a contentType.
                * I used the `extname` method on the built in path module to get the extension of the requested file.
            * if the requested url pointed to a particular project a readStream was started using the built in fs module.
            * the readStream was piped directly to the response because the response is a writeStream.
    * fileMap: an object that maps the request url to an absolute path.  This does two things:
        * validates that the requested url is a good one
        * provides the absolute path to the requested file.
        * I decided to send the fileMap object as a parameter because it is created synchronously.  Thus, I only want to build it once and, to prevent it blocking requests, do it before starting the server. Therefore, it has to be sent to the handler so that handler can use it for finding the requested file.

**projectList module**
* has one method that returns an html string producing a page with links to project directories
* in order to build the html string I utilized a templating language: handlebars.  
    * this meant installing handlebars via npm install
    
