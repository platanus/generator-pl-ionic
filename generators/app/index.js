'use strict';
const Generator = require('yeoman-generator');
const process = require('process');
const exec = require('child_process').execSync;

const folderName = process.cwd().split('/').pop();
/* eslint-disable no-magic-numbers */
const appName = folderName.replace(/[^a-zA-Z0-9_]/, ' ').
  split(' ').
  map((w) => `${w[0].toUpperCase()}${w.slice(1)}`).
  join(' ');

module.exports = Generator.extend({
  writing() {
    this.fs.copy(
      this.templatePath('circle.yml'),
      this.destinationPath('circle.yml')
    );
    this.fs.copy(
      this.templatePath('cibuild'),
      this.destinationPath('cibuild')
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        appName,
      }
    );
  },
  installingIonicCli() {
    exec('yarn global add ionic@latest cordova', { stdio: 'inherit' });
    exec(`ionic start ${folderName} --v2 --skip-npm -t blank`, { stdio: 'inherit' });
    exec(`cp -r ${folderName}/. .`);
    exec(`rm -rf ${folderName}`);
    exec('rm -f tslint.json');
    exec('rm -f .editorconfig');
    exec('yarn', { stdio: 'inherit' });
  },
  end() {
    this.composeWith(require.resolve('generator-git-init'), { commit: 'Initial commit' });
  },
});
