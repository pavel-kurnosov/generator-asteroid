/**
 * User: Pavel
 * Date: 01.04.14
 * Time: 23:50
 */

'user strict'
Meteorites = new Meteor.Collection('Meteorites');

Meteorites.allow({
    insert: true,
    update: true,
    remove: true
});

Meteor.methods({
    meteorites: function() {
        return Meteorites.find();
    }
});