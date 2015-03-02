import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        gotoRoute:function(route){
            alert('Application gotoRoute: '+route);

            this.transitionTo(route);
            //this.get('target').transitionTo(route);
        }
    }
});
