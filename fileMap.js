const fs = require('fs');

//returns and objec that maps incoming url to absolute path
//use async method here because it happens only once before server starts.

function getFileMap(startDir) {

    var map = {};

    makeMap(startDir);

    function makeMap(dir){
        try {

            //this returns a list of files and directories in the direcotry sent in.
            var fileNames = fs.readdirSync(__dirname + dir);

            fileNames.forEach(function(name){
                //loop through the names and find out if it is a directory

                var stats = fs.statSync(__dirname + dir + '/' + name);

                let projectPath = dir + '/' + name;
                //if it is a directory than I need to loop throug again and set last slash on the key
                if(stats.isDirectory()) {

                    makeMap(projectPath);
                    projectPath += '/';
                    map[projectPath] = __dirname + projectPath + 'index.html';
                } else {
                    //if it is not a directory, then do not put last slash in.
                    map[projectPath] = __dirname + projectPath;
                }

            }); //end forEach
        } catch (e) {
            console.error(e);
            process.exit();
        }
    } //end makeMap

    return map;

}

module.exports.getMap = getFileMap;
