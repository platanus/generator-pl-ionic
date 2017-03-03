'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('storename', { type: String, required: true });

    // And you can then access it later; e.g.
    this.log(this.options.storename);
    this.props = {
      storeName: this.options.storename,
      storeNameCapitalized: this.options.storename.charAt(0).toUpperCase() + this.options.storename.slice(1).toLowerCase()
    };
    console.log(this.props);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationPath(`src/store/${this.options.storename}`),
      {
        storeName: this.props.storeName,
        storeNameCapitalized: this.props.storeNameCapitalized,
      }
    );
    const storeFiles = ['actions', 'effects', 'model', 'reducer'];
    storeFiles.forEach((file) => {
      this.fs.move(
        this.destinationPath(`src/store/${this.options.storename}/store.${file}.ts`),
        this.destinationPath(`src/store/${this.options.storename}/${this.options.storename}.${file}.ts`)
      );
    });
  }

  install() {
    this.yarnInstall(['@ngrx/core', '@ngrx/store', '@ngrx/effects']);
  }

  end() {
    this.log(`Remember to add the store and the ngrx imports to app.module.ts
    ----
    ${chalk.cyan('import { StoreModule } from \'@ngrx/store\'')}
    ${chalk.cyan('import { EffectsModule } from \'@ngrx/effects\'')};

    ${chalk.cyan('import { ' + this.options.storename + 'Reducer } from \'../store/' + this.options.storename + '\'')};
    ----
    ${chalk.cyan('StoreModule.provideStore({')}
      ${chalk.cyan(this.options.storename + ': ' + this.options.storename + 'Reducer')},
    ${chalk.cyan('}')};
    ----
    `);
  }
};
