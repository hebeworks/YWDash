import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        gotoRoute:function(route){
            this.transitionTo(route);
        }
    }
});
