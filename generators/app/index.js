'use strict';
const Generator = require('yeoman-generator');
const process = require('process');
const exec = require('child_process').execSync;

module.exports = Generator.extend({
  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },
  installingIonicCli() {
    const folderName = process.cwd().split('/').pop();
    exec('yarn global add ionic@latest cordova', { stdio: 'inherit' });
    exec(`ionic start ${folderName} --v2 --skip-npm -t blank`, { stdio: 'inherit' });
    exec(`cp -r ${folderName}/. .`);
    exec(`rm -rf ${folderName}`);
    exec('yarn', { stdio: 'inherit' });
  },
});
