import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Parking Fines');
        this.set('subTitle', 'Q3 2014/15');
    }
});
