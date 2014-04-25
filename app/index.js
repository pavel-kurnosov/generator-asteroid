'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var sys = require('sys')
var exec = require('child_process').exec;
var bootstarap = require('./bootstrap');
var accounts = require('./accounts');
var fs = require('fs');

var AsteroidGenerator = yeoman.generators.Base.extend();

AsteroidGenerator.packages = [
    'standard-app-packages',
    'iron-router'
];

AsteroidGenerator.smartPackages = {
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
    this.mkdir('.meteor');
    this.mkdir('client');
    this.mkdir('client/compatibility');
    this.mkdir('client/styles');
    this.mkdir('client/lib');
    this.mkdir('client/view');

    this.mkdir('lib');

    this.mkdir('server');

    this.mkdir('public');
    this.mkdir('public/images');

    this.mkdir('private');
    this.mkdir('packages');

    this.copy('.meteor/release', '.meteor/release');
    this.copy('client/routes.js', 'client/routes.js');

    this.copy('client/view/layout.html', 'client/view/layout.html');
    this.copy('client/view/home.html', 'client/view/home.html');

    if (this.isBootstrapUse) {
        this.copy('client/bootstrap/view/header.html', 'client/view/header.html');
        if (this.isUseSass) {
            this.directory('client/bootstrap/scss', 'client/styles/scss');
        } else if (this.isUseLess){
            this.directory('client/bootstrap/less', 'client/styles/less');
        }
    } else {
        this.copy('client/view/header.html', 'client/view/header.html');
    }
};

AsteroidGenerator.prototype.checkFiles = function checkFiles() {
    var file = this.readFileAsString('client/view/header.html');
    if (this.isUseAccounts) {
        fs.writeFileSync('client/view/header.html', file.replace('%USER_TEMPLATE%', '{{> loginButtons }}'));
    } else {
        fs.writeFileSync('client/view/header.html', file.replace('%USER_TEMPLATE%', ''));
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