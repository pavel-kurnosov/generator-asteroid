'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var sys = require('sys')
var exec = require('child_process').exec;
var bootstarap = require('./bootstrap');
var accounts = require('./accounts');

var AsteroidGenerator = yeoman.generators.Base.extend();

AsteroidGenerator.packages = [
    'standard-app-packages'
];

AsteroidGenerator.smartPackages = {
    "meteor": {
        "git": "https://github.com/meteor/meteor.git",
        "branch": "master"
    },
    "packages": {
        "iron-router": {}
    }
};

AsteroidGenerator.prototype.askFor = function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Asteroid generator.'));

    var prompts = [
        {
            name: 'appName',
            message: 'What is your app name?'
        }
    ];

    this.prompt(prompts, function (values) {
        this.appName = values.appName;

        done();
    }.bind(this));
};


bootstarap.bootstrapGenerator(AsteroidGenerator);
accounts.accountsGenerator(AsteroidGenerator);

// generate the basic scaffolding for a Meteor project
AsteroidGenerator.prototype.app = function app() {
    this.mkdir('client');
    this.mkdir('client/compatibility');
    this.mkdir('client/styles');
    this.mkdir('client/lib');
    this.mkdir('client/views');
    this.mkdir('lib');
    this.mkdir('server');
    this.mkdir('public');
    this.mkdir('public/fonts');
    this.mkdir('public/images');
    this.mkdir('private');
    this.mkdir('packages');
    this.mkdir('.meteor');

    this.copy('.meteor/release', '.meteor/release');
    this.copy('sample_name.html', 'client/' + this.appName + '.html');
    if (this.isUseSass) {
        this.directory('client/bootstrap/scss', 'client/styles/scss');
    } else if (this.isUseLess){
        this.directory('client/bootstrap/less', 'client/styles/less');
    }

    if (this.isUseAccounts) {
        this.copy('client/accounts/sample_name.html', 'client/' + this.appName + '.html');
    }
};

AsteroidGenerator.prototype.done = function done() {
    this.write('.meteor/packages', AsteroidGenerator.packages.join('\n'));
    this.write('smart.json', JSON.stringify(AsteroidGenerator.smartPackages, null, 2));
};


//AsteroidGenerator.prototype.initMrt = function () {
//    var done = this.async();
//    exec("mrt install", function () {
//        done();
//    });
//};

module.exports = AsteroidGenerator;