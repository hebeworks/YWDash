/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function () {
        this.set('title', 'Statutory notices');
        this.set('subTitle', 'Added this month');
        var obj = this;
                obj.set('newlyAddedCount', 4);

//        this.store.find('StatNotices')
//            .then(function (items) {
//                // Todo: how to define new?
//                    // start date - so search for items newer then startDate
//                obj.set('newlyAddedCount', 4);
//                setTimeout(() => {
//                    obj.set('loaded', true);
//                });
//            });
    },
    
    click: function() {
        this.set('action','gotoRoute');
        this.sendAction('action', 'statnotices');
    }
});
