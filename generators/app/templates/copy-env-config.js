/* eslint-disable */

// source https://github.com/geeklearningio/gl-ionic2-env-configuration/blob/master/test-app/copy-env-config.js

var fs = require('fs');

for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--env') {
        if (process.argv[i + 1]) {
            jsonConfigurationFile = process.argv[i + 1] + '.json';
        }
    }
}

var wwwDir = 'www';

if (!fs.existsSync(wwwDir)){
    fs.mkdirSync(wwwDir);
}

console.log('copying ' + jsonConfigurationFile);
var rd = fs.createReadStream('src/env-configuration/' + jsonConfigurationFile)
var wd = fs.createWriteStream(wwwDir + '/env-configuration.json');
rd.on('error', handleError);
wd.on('error', handleError);

function handleError(err) {
  rd.destroy();
  wd.end();
  console.error('There was an error while copying the environmemt configuration file:');
  console.error(err);
  throw(err);
}

rd.pipe(wd);
