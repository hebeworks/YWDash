import Ember from 'ember';

export default Ember.View.extend({
    actions: {
        gotoRoute:function(){
            this.sendAction();
        }
    }
});
