import Ember from 'ember';

export default Ember.ArrayController.extend({
    navItems: function(){
        return ['Item 1','Item 2'];
    }.property()
});
