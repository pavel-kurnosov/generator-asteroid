/**
 * User: Pavel
 * Date: 01.04.14
 * Time: 22:46
 */
var bootstrapGenerator = function (AsteroidGenerator) {

    AsteroidGenerator.prototype.bootstrapGenerator = function () {
        var done = this.async();

        var prompts = [
            {
                type: 'confirm',
                name: 'isUseSass',
                message: 'Do you want to use SASS?',
                default: true
            },
            {
                type: 'confirm',
                name: 'isUseLess',
                message: 'Do you want to use LESS?',
                default: true,
                when: function (props) {
                    return !props.isUseSass;
                }
            },
            {
                type: 'confirm',
                name: 'isBootstrapUse',
                message: 'Do you want to use Bootstrap 3?',
                default: true
            }
        ];

        this.prompt(prompts, function (values) {
            var me = this;
            me.isUseSass = values.isUseSass;
            me.isUseLess = values.isUseLess;
            me.isBootstrapUse = values.isBootstrapUse;

            if (me.isUseSass) {
                AsteroidGenerator.smartPackages.packages.scss = {};
                AsteroidGenerator.packages.push('scss');
                if (me.isBootstrapUse) {
                    AsteroidGenerator.smartPackages.packages['bootstrap3-sass'] = {};
                    AsteroidGenerator.packages.push('bootstrap3-sass');
                }
            } else if (me.isUseLess) {
                AsteroidGenerator.packages.push('less');
                if (me.isBootstrapUse) {
                    AsteroidGenerator.smartPackages.packages['bootstrap3-less'] = {};
                    AsteroidGenerator.packages.push('bootstrap3-less');
                }
            } else if (me.isBootstrapUse) {
                AsteroidGenerator.smartPackages.packages['bootstrap-3'] = {};
                AsteroidGenerator.packages.push('bootstrap-3');
            }
            done();
        }.bind(this));
    }
};

module.exports.bootstrapGenerator = bootstrapGenerator;