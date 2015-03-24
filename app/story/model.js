import DS from 'ember-data';

var story = DS.Model.extend({
    title: DS.attr()
});

//story.reopenClass({
//    FIXTURES: [
//        { id: '1', title: 'Story title 1', subTitle: 'Story sub title 1', author: '1' },
//        { id: '2', title: 'Story title 2', subTitle: 'Story sub title 2', author: '2' }
//    ]
//});

export default story;