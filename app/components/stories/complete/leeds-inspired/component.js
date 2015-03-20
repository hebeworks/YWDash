import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    didInsertElement: function() {
        this.set('title', 'Leeds Inspired');
    }
});
