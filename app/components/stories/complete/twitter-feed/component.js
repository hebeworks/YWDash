import Ember from 'ember';
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function () {
        this.set('title', 'Twitter Feed');
        this.set('subTitle', 'What are we tweeting about?');
        var obj = this;
        
    }
});
