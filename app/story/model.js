import DS from 'ember-data';

var story = DS.Model.extend({
    title: DS.attr('string'),
    storyType: DS.attr('string'),
    configJSON: DS.attr('string')
});

export default story;