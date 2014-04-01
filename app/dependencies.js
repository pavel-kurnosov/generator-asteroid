/**
 * User: Pavel
 * Date: 02.04.14
 * Time: 00:12
 */
var buildPackages = function (AsteroidGenerator, packages) {

    AsteroidGenerator.prototype.bootstrapGenerator = function() {
        var done = this.async();

        var prompts = [
            {
                type: 'confirm',
                name: 'isBootstrapUse',
                message: 'Do you want to use Bootstrap 3?',
                default: true
            }
        ];

        this.prompt(prompts, function (values) {
            this.isBootstrapUse = values.isBootstrapUse;

            done();
        }.bind(this));
    }
};

var buildSmartPackages = function (AsteroidGenerator, smartPackages) {

    AsteroidGenerator.prototype.bootstrapGenerator = function() {
        var done = this.async();

        var prompts = [
            {
                type: 'confirm',
                name: 'isBootstrapUse',
                message: 'Do you want to use Bootstrap 3?',
                default: true
            }
        ];

        this.prompt(prompts, function (values) {
            this.isBootstrapUse = values.isBootstrapUse;

            done();
        }.bind(this));
    }
};

module.exports.buildPackages = buildPackages;
module.exports.buildSmartPackages = buildSmartPackages;
