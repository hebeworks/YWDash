import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', '');
        this.set('subTitle', '');
    }
});
