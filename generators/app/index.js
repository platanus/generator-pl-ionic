'use strict';
const Generator = require('yeoman-generator');
const process = require('process');
const exec = require('child_process').execSync;
const chalk = require('chalk');
const fs = require('fs');

const folderName = process.cwd().split('/').pop();
/* eslint-disable no-magic-numbers */
const appName = folderName.replace(/[^a-zA-Z0-9_]/, ' ').
  split(' ').
  map((w) => `${w[0].toUpperCase()}${w.slice(1)}`).
  join(' ');

const cleanedName = folderName.replace(/[^a-zA-Z0-9]/, '-').toLowerCase();

module.exports = Generator.extend({
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'proxyApiUrl',
        message: `${chalk.cyan('[1/2]')} Please enter the base API url (staging) that will be proxified through /api`,
        default: `http://pl-${cleanedName}-staging.herokuapp.com/api/v1`,
      },
      {
        type: 'input',
        name: 'productionApiUrl',
        message: `${chalk.cyan('[2/2]')} Please enter the API url that will be used in production`,
        default: `http://pl-${cleanedName}.herokuapp.com/api/v1`,
      },
    ]).then((props) => {
      this.props = props;
    });
  },
  configuring: {
    installGlobalIonic() {
      exec('yarn global add ionic@latest cordova', { stdio: 'inherit' });
    },
    runIonicGenerator() {
      exec(`ionic start ${folderName} --v2 --skip-npm -t blank`, { stdio: 'inherit' });
    },
    cleanIonicInstall() {
      exec(`cp -r ${folderName}/. .`);
      exec(`rm -rf ${folderName}`);
      exec('rm -f tslint.json');
      exec('rm -f .editorconfig');
    },
  },
  writing() {
    this.fs.copy(
      this.templatePath('circle.yml'),
      this.destinationPath('circle.yml')
    );
    this.fs.copy(
      this.templatePath('copy-env-config.js'),
      this.destinationPath('copy-env-config.js')
    );
    this.fs.copyTpl(
      this.templatePath('env-configuration/**'),
      this.destinationPath('src/env-configuration'),
      {
        proxyApiUrl: this.props.proxyApiUrl,
        productionApiUrl: this.props.productionApiUrl,
      }
    );
    const ionicProjectFile = fs.readFileSync('ionic.config.json');
    const ionicProject = JSON.parse(ionicProjectFile);
    ionicProject.proxies = [
      { 'path': '/api', 'proxyUrl': this.props.proxyApiUrl },
    ];
    fs.writeFileSync('ionic.config.json', JSON.stringify(ionicProject, null, 2));
    this.fs.copy(
      this.templatePath('bin/cibuild'),
      this.destinationPath('bin/cibuild')
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        appName,
      }
    );
  },
  install: {
    installEnvManager() {
      this.yarnInstall(['gl-ionic2-env-configuration']);
    },
  },
  end() {
    this.composeWith(require.resolve('generator-git-init'), { commit: 'Initial commit' });
  },
});
