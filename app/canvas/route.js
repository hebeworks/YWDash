import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('dashboard.header',{ outlet: 'header' });
        this.render({ outlet: 'body' });
    },
    model:function(){
        return this.store.find('story').then(function(data){
            console.log('Canvas route > story loaded: '+data.content);
            return data;
        });
    }
});
