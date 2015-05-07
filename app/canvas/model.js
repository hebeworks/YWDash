import DS from 'ember-data';

var canvas = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
    stories: DS.hasMany('story')
});

export default canvas;