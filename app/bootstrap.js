/**
 * User: Pavel
 * Date: 01.04.14
 * Time: 22:46
 */
var bootstrapGenerator = function (AsteroidGenerator) {

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

module.exports.bootstrapGenerator = bootstrapGenerator;