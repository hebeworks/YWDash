import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('dashboard.header',{ outlet: 'header' });
        this.render({ outlet: 'body' });
    },
    actions: {
        viewDashboard: function(id){
            this.transitionTo('dashboard.view', id);
        }
    },
    model:function(){
        return this.store.find('story').then(function(data){
            console.log('Canvas route > story loaded: '+data.content);
            return data;
        });
    }
});