/**
 * User: Pavel
 * Date: 04.04.14
 * Time: 00:10
 */
var accountsGenerator = function (AsteroidGenerator) {

    AsteroidGenerator.prototype.accountsGenerator = function () {
        var done = this.async();


        var prompts = [
            {
                type: 'confirm',
                name: 'isUseAccounts',
                message: 'Do you want to use Accounts?',
                default: true
            }
        ];

        this.prompt(prompts, function (values) {
            var me = this;
            me.isUseAccounts = values.isUseAccounts;

            if (!me.isUseAccounts) {
                done();
                return;
            }

            AsteroidGenerator.packages.push('accounts-password');
            if (me.isBootstrapUse) {
                AsteroidGenerator.packages.push('accounts-ui-bootstrap-3');
                AsteroidGenerator.smartPackages.packages['accounts-ui-bootstrap-3'] = {};
            } else {
                AsteroidGenerator.packages.push('accounts-ui');
            }
            done();
        }.bind(this));
    }
};

module.exports.accountsGenerator = accountsGenerator;