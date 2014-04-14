/**
 * User: Pavel
 * Date: 11.04.14
 * Time: 22:47
 */
Router.configure({
    layout: 'layout'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'layout',
//        waitOn: function() {
//            return Meteor.subscribe('collectionName');
//        },
        yieldTemplates: {
            'header': {to: 'header'}
        }/*,
        data: {
            rooms: function () {
                return CollecitonName.find();
            }
        }*/
    });
});

