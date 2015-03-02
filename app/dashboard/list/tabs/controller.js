import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        showTab: function(tab){
            console.log('tab = '+tab);
            // add dashboard-library-category-view
            return true;
        }
    }
});
